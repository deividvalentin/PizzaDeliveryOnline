var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    OrderID : String,
    CustomerFirstName: String,
    CustomerLastName: String,
    CustomerPhone: String,
    CustomerAddress: String,
    CustomerPostalCode: String,
    CustomerCity: String,
    OrderDate: {type: Date, default : Date.now},
    OrderExpectedDate: Date,
    OrderItems: [{
        itemName: String,
        itemSize: String,
        itemType: String,
        itemQuantity: Number,
        itemPrice: Number,
        itemTotal: Number
    }],
    OrderTypePayment: String,
    OrderTotal: Number
});

module.exports = mongoose.model('Order', OrderSchema);
