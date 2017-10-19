var Order = require('../models/order');

const PST = 0.07;
const GST = 0.05;

exports.saveData = (data) => {
    console.log(data);
    var order = new Order(data);
    
    order.save(function(err){
        if(err) {
           console.log({error : "Failed to save the order"});
        }
    });
    console.log({msg: "success"});
}


exports.getDataToJson = (data) => {
    let itemName;
    let itemSize;
    let itemType;
    let itemQuantity;
    let itemPrice;
    let orderItems = [];
    
    let keys = Object.keys(data);
    let i = 0;

    keys.forEach(function(key){
        var initials = key.substr(0,3);      
        switch (initials) {
            case 'chk': //checkbox
                itemName = data[key].substr(0, data[key].indexOf('$') - 1);
                itemPrice = data[key].substr(data[key].indexOf('$') + 1, data[key].length - 1);
                ++i;
                break;
             case 'opt': //optionRadio
                itemSize = data[key];
                ++i;
                break;
             case 'toc': //selectOption - types of Crust
                itemType = data[key];
                ++i;
                break;
             case 'qty': //selectOption -- Quantity
                itemQuantity = data[key];
                ++i;
                break;
            default:
                break;
        }

        if( i === 4){
            orderItems.push({
                itemName: itemName,
                itemSize: itemSize,
                itemType: itemType,
                itemQuantity: itemQuantity,
                itemPrice: itemPrice,
                itemTotal: (parseFloat(itemPrice) * parseFloat(itemQuantity))
            });
            i = 0;
        }      
    });

    //console.log(orderItems);

    var order = {
        OrderID : getOrderNumber(),
        CustomerFirstName: data["firstName"],
        CustomerLastName: data["lastName"],
        CustomerPhone: data["phone"],
        CustomerAddress: data["address"],
        CustomerPostalCode: data["postalCode"],
        CustomerCity: data["city"],
        OrderExpectedDate: addMinutes(new Date(), 30),
        OrderItems: orderItems,
        OrderTypePayment: data["typePayment"],
        OrderTotal: calcPrice(orderItems)
    }

    return order;
}

calcPrice = (items) => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        total = total + items[i].itemTotal;        
    }

    total = (total + (total * GST)).toFixed(2);

    return total;
}

getOrderNumber = () => {
    let alphanumeric = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let orderNumbers = [];
    
    for (let i = 0; i < 6; i++) {
        orderNumbers.push(alphanumeric[getRandomIntInclusive(0, alphanumeric.length - 1)]); 
    }
    
    return orderNumbers.join('');

}

getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}
