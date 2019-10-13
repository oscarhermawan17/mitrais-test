var db = require('../models');
const methods = {};

methods.registrationUser = (req,res)=>{
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
        if(err.hasOwnProperty('fields')){
            let tmp = Object.getOwnPropertyNames(err.fields)
            if(tmp[0] === "mobile_number"){
                res.send({status:"failed", message_response:"Phone number already exist", path:"mobile_phone", type:"exist"})
            } else if(tmp[0] === "email")
                res.send({status:"failed", message_response:"Email already exist", path:"email", type:"exist"})
            else 
                res.send({status:"failed", message_response:"Error input data"})
        }
        res.send({status:"failed", message_response:"Error input data"})
    })
}


module.exports = methods