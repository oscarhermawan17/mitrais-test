var db = require('../models');
const methods = {};

methods.registrationUser = (req,res)=>{
    db.User.create({
        mobile_number:req.body.mobile_number,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        dob:req.body.dob,
        email:req.body.email
    })
    .then(user =>{
        res.send({status:"success", data:user, message_response:"registration success"})
    })
    .catch(err=> {
        res.send({status:"failed", message_response:err})
    })
}


module.exports = methods