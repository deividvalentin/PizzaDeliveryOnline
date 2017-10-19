var express = require('express');
var router = express.Router();
var request = require('superagent');

/* GET Orders */
router.get('/orderlist', function(req, res) {
    const url = 'http://localhost:3000/api/orders';
    request.get(url).end(function(err, resp){
        if (!err && resp.statusCode == 200) {
            res.render('orderlist', { title: "Admin Session", orders: resp.body });  
        }        
    });    
});

router.post('/orderlist', function(req, res) {
    let phone = req.body.phone;
    let address = req.body.address || null;
    const url = `http://localhost:3000/api/orders/${phone}/${address}`;
    request.get(url).end(function(err, resp){
        if (!err && resp.statusCode == 200) {
            res.render('orderlist', { title: "Admin Session", orders: resp.body });  
        }        
    });    
});

module.exports = router;
