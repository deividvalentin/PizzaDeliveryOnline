var express = require('express');
var request = require('superagent');
var util = require('../utils/util');
var router = express.Router();

var order = {};

router.get('/order', function(req, res) {
    let pizzas = req.app.get('pizzas');
    res.render('order', { pizzas: pizzas });
});

router.post('/order', function(req, res){
    order = util.getDataToJson(req.body);
    res.render('orderConfirmation', { order: order });
});

router.post('/orderConfirmation', function(req, res){
   
    if(req.body.btnConfirm === 'Confirm')
    {
        const url = 'http://localhost:3000/api/orders';
  
        request.post(url)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(order))
            .end((err, resp) =>
            {
                if (err || !resp.ok) {
                    console.log('Error');
                } else {
                    res.render('orderConfirmed');
                }
            });
    }
    else
    {
        res.render('order', { pizzas: pizzas });
    }
});

module.exports = router;