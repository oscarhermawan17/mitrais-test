var methods = {}
methods.user = (req,res, next) => {
    let regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const check_mobile_number = (mobile_number) =>{
        return false
    }
    const check_first_name = (first_name) => {
        if(first_name === "")
            return false
        else 
            return true
    }

    const check_last_name = (last_name) => {
        if(last_name === "")
            return false
        else 
            return true
    }
        
    const check_gender = (gender) => {
        if(gender === null || gender ==="Male" || gender ==="Female")
            return true
        else   
            return false
    }

    const check_dob = (dob) => {
        return false
    }

    const check_email = (email) => {
        if(regex_email.test(req.body.email) === true)
            return true
        else
            return false    
    }

    if(check_mobile_number(req.body.mobile_number) === false)
        res.send({status:"failed"})
    else if(check_first_name(req.body.first_name) === false)
        res.send({status:"failed"})
    else if(check_last_name(req.body.last_name) === false)
        res.send({status:"failed"})
    else if(check_gender(req.body.gender) === false)
        res.send({status:"failed"})
    else if(check_dob(req.body.dob) === false)
        res.send({status:"failed"})
    else if(check_email(req.body.email) === false)
        res.send({status:"failed"})
    else
        next()
}
module.exports = methods
