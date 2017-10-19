var express = require('express');
var util = require('../utils/util');
var Order = require('../models/order');
var router = express.Router();


/* REST API */
router.get('/api/orders', function(req, res){
    let query = Order.find({}).limit(100);
    query.exec(function(err, orders){
       if(err) {
            return res.status(500).json({error : "Failed to get all orders"});
       }
       res.json(orders);
    });
});

router.post('/api/orders', function(req, res){    
    //console.log(req.body);
    var order = new Order(req.body);
    
    order.save(function(err){
        if(err) {
            return res.status(500).json({error : "Failed to save the order"});
        }
    });
   return res.json({msg: "success"});
});

router.get('/api/orders/:phone/:address', function(req, res){    
   console.log(req.params);
   let phone = req.params.phone;
   let address = req.params.address;

    /* Two ways to get data by params */
    //    Order.find({CustomerPhone: phone, CustomerAddress: address}, function(err, orders){
    //        if(err) {
    //             return res.status(500).json({error : "Failed to get all orders"});
    //        }
    //        res.json(orders);
    //     });

    /* Execute the query */
    var query;
    if(address !== 'null') {
        console.log('test 1 and 2');
        query = Order.find({}).where({CustomerPhone: phone, CustomerAddress: address});
    }else {
        console.log('test 1');
        query = Order.find({}).where({CustomerPhone: phone});
    }
   
    query.exec(function(err, orders){
       if(err) {
            return res.status(500).json({error : "Failed to get the orders"});
       }
       res.json(orders);
    });
});

module.exports = router;
