var db = require('../models');
const methods = {};

methods.registrationUser = (req,res)=>{
    console.log('masuk controller', req.body)
    db.User.create({
        mobile_number:req.body.mobile_number,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        dob:req.body.dob,
        gender:req.body.gender,
        email:req.body.email
    })
    .then(user =>{
        res.send({status:"success", data:user, message_response:"registration success"})
    })
    .catch(err=> {
        res.send({status:"failed", err})
    })
}


module.exports = methods