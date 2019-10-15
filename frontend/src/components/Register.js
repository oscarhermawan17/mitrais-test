import React from 'react';
import Footer from '../stateless/Footer'
import axios from 'axios'
import Warning from '../stateless/Warning'
import '../Style.css'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      data_registration:{
        mobile_number:"",
        first_name:"",
        last_name:"",
        date_birth:"Date",
        month_birth:"Month",
        year_birth:"Year",
        gender:null,
        email:""
      },
      date_birth:"Date",
      month_birth:"Month",
      year_birth:"Year",
      select_dates:[],
      select_months:["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"], // set default Month
      select_years:[], //Set default year in "ComponentDidMount"
      active_non_active_form:"container",
      css_footer:"footer",
      hidden_button:{
        display: "none",
        position: "absolute",
        top: "40px",
        zIndex: "10",
      },
      warning:{
        mobile_number:{
          message:"",
          display_css:"warning_required hidden_warning"
        },
        first_name:{
          message:"",
          display_css:"warning_required hidden_warning"
        },
        last_name:{
          message:"",
          display_css:"warning_required hidden_warning"
        },
        email:{
          message:"",
          display_css:"warning_required hidden_warning"
        },
      },
      select_hidden_month:"hidden_warning",
      select_hidden_date:"hidden_warning",
      select_hidden_year:"hidden_warning",
    }
  }

  componentDidMount(){  
    let get_year = new Date();
    var full_year = get_year.getFullYear();
    let total_year = []
    for(let i=1980; i<=parseInt(full_year); i++){
      total_year.push(i)
    }
    this.setState({select_years:total_year})
  }

  must_be_required(value) {
    if(value === "" || value === null || value === undefined) 
      return false 
    else 
      return true
  }

  regex_check(value, entity){
    let regex_name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
    let regex_mobile_number = /^(^\+62\s?|^0\s?|^62)(\d{3,4}-?){2}\d{3,4}$/g
    let regex_email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if(entity === "mobile_number")
      return regex_mobile_number.test(value)
    else if(entity === "first_name" || entity === "last_name")
      return regex_name.test(value)
    else if(entity === "email")
      return regex_email.test(value) 
  }

  dropDownSelect(value){
    if(value === "month" && this.state.select_hidden_month === "hidden_warning"){
      this.setState({select_hidden_month:""})
      this.setState({select_hidden_date:"hidden_warning"})
      this.setState({select_hidden_year:"hidden_warning"})
    }
      
    else if(value === "date" && this.state.select_hidden_date === "hidden_warning"){
      this.setState({select_hidden_date:""})
      this.setState({select_hidden_month:"hidden_warning"})
      this.setState({select_hidden_year:"hidden_warning"})
    }
    else if(value === "year" && this.state.select_hidden_year === "hidden_warning"){
      this.setState({select_hidden_year:""})
     this.setState({select_hidden_month:"hidden_warning"})
     this.setState({select_hidden_date:"hidden_warning"})
    }
     
    else{
      this.setState({select_hidden_month:"hidden_warning"})
      this.setState({select_hidden_date:"hidden_warning"})
      this.setState({select_hidden_year:"hidden_warning"})
    }
  }

  setDates(total_days){
    let total_date = [];
    for(let i = 1; i <= total_days; i++){
      total_date.push(i);
    }
    if(total_date.length >= 28 && total_date.length<=31){
      return total_date;
    } else
      return "Date"
      
  }

  // Setting total day in Month by click month and year
  onChangeValue(value, entity){
    let obj = {...this.state.data_registration, [entity]:value}
    if(entity === "mobile_number" || entity === "first_name" ||  entity === "last_name"  || entity === "email"){
      let obj_warning = {
        message:"",
        display_css:"warning_required hidden_warning"
      }
      this.setState({warning:{...this.state.warning, [entity]: obj_warning}})
    }
    this.setState({data_registration:obj}) 
  }

  onChangeValueCustom(value, entity){
    let totalDayinMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    this.setState({data_registration: {...this.state.data_registration, [entity]:value}}, () => {
      if(entity === "year_birth" && value%4 === 0 && this.state.data_registration.month_birth === "Feb" )
        this.setState({select_dates:this.setDates(29)})
      else if(entity === "month_birth" && value === "Feb" && this.state.data_registration.year_birth%4 === 0)
        this.setState({select_dates:this.setDates(29)})
      else if(entity === "month_birth")
        this.setState({select_dates:this.setDates(totalDayinMonth[this.state.select_months.indexOf(value)])})
    })
    this.setState({select_hidden_month:"hidden_warning"})
    this.setState({select_hidden_date:"hidden_warning"})
    this.setState({select_hidden_year:"hidden_warning"})
  }

  setWarning(message, path){
    let obj_warning = {
      message:message,
      display_css:"warning_required"
    }
    this.setState({warning:{...this.state.warning, [path]: obj_warning}})
  }

  setValidationFrontEnd(){
    if(this.must_be_required(this.state.data_registration.mobile_number) === false){
      this.setWarning("Please enter mobile phone", "mobile_number")    
      return false
    } else if(this.regex_check(this.state.data_registration.mobile_number, "mobile_number") === false){
      this.setWarning("Please enter valid Indonesian phone number", "mobile_number")    
      return false
    } else if(this.must_be_required(this.state.data_registration.first_name) === false){
      this.setWarning("Please enter First name", "first_name")    
      return false
    } else if(this.regex_check(this.state.data_registration.first_name, "first_name") === false){
      this.setWarning("Enter Name correctly, A-Z (space, -, ', dot in middle of your name)", "first_name")    
      return false
    } else if(this.must_be_required(this.state.data_registration.last_name) === false){
      this.setWarning("Please enter Last name", "last_name")    
      return false
    } else if(this.regex_check(this.state.data_registration.last_name, "last_name") === false){
      this.setWarning("Enter Name correctly, A-Z (space, -, ', dot in middle of your name)", "last_name")    
      return false
    } else if(this.must_be_required(this.state.data_registration.email) === false){
      this.setWarning("Please enter Email", "email")    
      return false
    } else if(this.regex_check(this.state.data_registration.email, "email") === false){
      this.setWarning("Please enter valid format Email", "email")    
      return false
    } else 
      return true
  }
  setDob(){
    let dob = null
    if(Number.isInteger(parseInt(this.state.data_registration.month)) === true && Number.isInteger(parseInt(this.state.data_registration.date)) === true && Number.isInteger(parseInt(this.state.data_registration.year)) === true)
      return { ...this.state.data_registration, dob:`this.state.data_registration.year-this.state.data_registration.month-this.state.data_registration.date`}
    else 
      return { ...this.state.data_registration, dob:dob}
  }
  

  submitData(){
    let validation = this.setValidationFrontEnd()
    let obj = this.setDob()
  
    if(validation === true){
      axios.post(`http://127.0.0.1:3001/api/users/registration`, obj)
      .then(data =>{
        if(data.data.status === "failed"){
          this.setWarning(data.data.message_response, data.data.path)
        } else if(data.data.status === "success"){
            alert('Success Registration')
            this.setState({active_non_active_form:"container blur"})
            this.setState({css_footer:"footer blur"})
            this.setState({hidden_button: {...this.state.hidden_button, display: "inline"}})
        }
      })
      .catch(data =>{
        alert(`Check your internet connection`)
      })
    }
  }

  render(){
    return(
      <div>
        <div className={this.state.active_non_active_form}>
          <div className="form_validation">
              <span className="title_span">Registration</span>
              <Warning warning_props={this.state.warning.mobile_number}/>
              <input type="text" name="mobile_number" required placeholder="Mobile Number" value={this.state.data_registration.mobile_number} onChange={(e) => this.onChangeValue(e.target.value, "mobile_number")}/>
              <Warning warning_props={this.state.warning.first_name}/>
              <input type="text" name="first_name" placeholder="First name" value={this.state.data_registration.first_name} onChange={(e) => this.onChangeValue(e.target.value, "first_name")}/>         
              <Warning warning_props={this.state.warning.last_name}/>
              <input type="text" name="last_name" placeholder="Last name" value={this.state.data_registration.last_name} onChange={(e) => this.onChangeValue(e.target.value, "last_name")}/>
              <div className="custom_select">
                <p>Date of Birth</p>
                
                <div>
                  <div className="container_select">
                  <div className="select_custom" onClick={() => this.dropDownSelect("month")}>{this.state.data_registration.month_birth} &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_month}>
                        <div className="select_custom_pilih" onClick={() => this.onChangeValueCustom("Month", "month_birth")}>Month &nbsp;</div>
                        {this.state.select_months.length === 0 ? null : this.state.select_months.map(month =>
                          <div className="select_custom_pilih" key={month} onClick={() => this.onChangeValueCustom(month, "month_birth")}>{month} &nbsp;</div>
                        )}
                    </div>
                  </div>

                  <div className="container_select">
                    <div className="select_custom" onClick={() => this.dropDownSelect("date")}>{this.state.data_registration.date_birth} &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_date}> 
                        <div className="select_custom_pilih" onClick={() => this.onChangeValueCustom("Date", "date_birth")}>Date &nbsp;</div>
                        {this.state.select_dates.length === 0 ? null : this.state.select_dates.map(date =>
                          <div className="select_custom_pilih" key={date} onClick={() => this.onChangeValueCustom(date, "date_birth")}>{date} &nbsp;</div>
                        )}
                    </div>
                  </div>

                  <div className="container_select">
                    <div className="select_custom" onClick={() => this.dropDownSelect("year")}>{this.state.data_registration.year_birth} &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_year}>
                        <div className="select_custom_pilih" onClick={() => this.onChangeValueCustom("Year", "year_birth")}>Year &nbsp;</div>
                        {this.state.select_years.length === 0 ? null : this.state.select_years.map(year =>
                          <div className="select_custom_pilih" key={year} onClick={() => this.onChangeValueCustom(year, "year_birth")}>{year} &nbsp;</div>
                        )}
                    </div>
                  </div>
                  <div className="clear_float"></div>
                </div>
              </div>

              <div className="radio_button_gender">
                  <input className="radiobutton" type="radio"  checked={this.state.data_registration.gender === "Male"} onChange={() => this.onChangeValue("Male", "gender")}/><span>&nbsp;Male</span> &nbsp; &nbsp; &nbsp;
                  <input className="radiobutton" type="radio" checked={this.state.data_registration.gender === "Female"} onChange={() => this.onChangeValue("Female", "gender")}/><span>&nbsp;Female</span>
              </div>
              <Warning warning_props={this.state.warning.email}/>
              <input type="text" name="last_name" placeholder="Email" value={this.state.data_registration.email} onChange={(e) => this.onChangeValue(e.target.value, "email")}/>
              <button type="submit" name="register" onClick={() => this.submitData()}>Register</button>
              
          </div> 
        </div>
        <div className="login_container">
          <div className="form_button_login">
            <div className="make_relative">
              <button type="submit" style={this.state.hidden_button} onClick={() => this.props.history.push('/login')}>Login</button> 
             </div> 
          </div> 
        </div>          
        <Footer css_footer={this.state.css_footer} />
      </div>
      
    )
  }
}

export default Register
