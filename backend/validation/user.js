var methods = {}
var moment = require('moment');

methods.user = (req,res, next) => {
    console.log('inside validation', req.body)
    let regex_email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    let regex_mobile_number = /^(^\+62\s?|^0\s?|^62)(\d{3,4}-?){2}\d{3,4}$/g

    const must_be_required = value => (value === "" || value === null || value === undefined) ? false : true 
    const check_gender = gender => (gender === null || gender ==="Male" || gender ==="Female") ? true : false
    const check_dob = dob => {  
        if(dob === null )
            return true
        else{
            let splitdob = dob.split("-")
            if(Number.isInteger(parseInt(splitdob[0])) === true && Number.isInteger(parseInt(splitdob[1])) === true && Number.isInteger(parseInt(splitdob[2])) === true){
                var date = moment(dob);
                return date.isValid()
            }
            else 
                return false
        }     
    }
    const check_email = email => (regex_email.test(req.body.email) === true) ? true : false
    const check_phone = phone => (regex_mobile_number.test(req.body.mobile_number) === true) ? true : false

    if(must_be_required(req.body.mobile_number) === false)
        res.send({status:"failed", message_response:"Please enter mobile phone", path:"mobile_number", type:"required"})
    else if(check_phone(req.body.mobile_number) === false)
        res.send({status:"failed", message_response:"Please enter valid Indonesian phone number", path:"mobile_number", type:"invalid"})  
    else if(must_be_required(req.body.first_name) === false)
        res.send({status:"failed", message_response:"Please enter First name", path:"first_name", type:"required"})
    else if(must_be_required(req.body.last_name) === false)
        res.send({status:"failed", message_response:"Please enter Last name", path:"last_name", type:"required"})
    else if(check_gender(req.body.gender) === false)
        res.send({status:"failed", message_response:"Please enter valid format gender", path:"gender", type:"invalid"})
    else if(check_dob(req.body.dob) === false)
        res.send({status:"failed", message_response:"Please enter valid format Dirth of Birth", path:"dob", type:"invalid"})
    else if(must_be_required(req.body.email) === false)
        res.send({status:"failed", message_response:"Please enter Email", path:"email", type:"required"})
    else if(check_email(req.body.email) === false)
        res.send({status:"failed", message_response:"Please enter valid format Email", path:"email", type:"invalid"})    
    else
        next()
}
module.exports = methods
