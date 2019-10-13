var methods = {}
var db = require('../models');
var moment = require('moment');

methods.user = (req,res, next) => {
    let regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const check_mobile_number_required = mobile_number => {
        if(mobile_number === "" || null)
            return false
        else 
            return true
    }
    const check_first_name_required = first_name => {
        if(first_name === "" || null)
            return false
        else 
            return true
    }

    const check_last_name_required = last_name => {
        if(last_name === "" || null)
            return false
        else 
            return true
    }
        
    const check_gender = gender => {
        if(gender === null || gender ==="Male" || gender ==="Female")
            return true
        else   
            return false
    }

    const check_dob = dob => {
        if(dob === null)
            return true
        else {
            var date = moment(dob);
            return date.isValid()
        }
    }
    const check_email_required = email =>{
        if(email === null || email ==="")
            return false
        else 
            return true
    }

    const check_email = email => {
        if(regex_email.test(req.body.email) === true)
            return true
        else
            return false    
    }

    if(check_mobile_number_required(req.body.mobile_number) === false)
        res.send({status:"failed", message_response:"Please enter mobile phone", path:"mobile_phone"})
    else if(check_first_name_required(req.body.first_name) === false)
        res.send({status:"failed", message_response:"Please enter First name", path:"first_name"})
    else if(check_last_name_required(req.body.last_name) === false)
        res.send({status:"failed", message_response:"Please enter Last name", path:"last_name"})
    else if(check_gender(req.body.gender) === false)
        res.send({status:"failed", message_response:"Please enter valid format gender", path:"gender"})
    else if(check_dob(req.body.dob) === false)
        res.send({status:"failed", message_response:"Please enter valid format Dirth of Birth", path:"dob"})
    else if(check_email_required(req.body.email) === false)
        res.send({status:"failed", message_response:"Please enter Email", path:"email"})
    else if(check_email(req.body.email) === false)
        res.send({status:"failed", message_response:"Please enter valid format email", path:"email"})    
    else
        next()
}
module.exports = methods
