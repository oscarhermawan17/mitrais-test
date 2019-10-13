import React from 'react';
import Footer from '../stateless/Footer'
import axios from 'axios'
import Warning from '../stateless/Warning'
import '../Style.css'

class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      data_registration:{
        mobile_number:"",
        first_name:"",
        last_name:"",
        date_birth:"0",
        month_birth:"0",
        year_birth:"0",
        gender:null,
        email:""
      },
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

  dropDownSelect(value){
    if(value === "month" && this.state.select_hidden_month === "")
      this.setState({select_hidden_month:"hidden_warning"})
    else
      this.setState({select_hidden_month:""})

  }

  setDates(total_days){
    let total_date = [];
    for(let i = 1; i <= total_days; i++){
      total_date.push(i);
    }
    this.setState({select_dates:total_date})
  }

  // Setting total day in Month by click month and year
  onChangeValue(value, entity){
    let obj = {...this.state.data_registration, [entity]:value}
    let totalDayinMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    if(entity === "mobile_number" || entity === "first_name" ||  entity === "last_name"  || entity === "email"){
      let obj_warning = {
        message:"",
        display_css:"warning_required hidden_warning"
      }
      this.setState({warning:{...this.state.warning, [entity]: obj_warning}})
    }

    if(entity === "month_birth"){
      this.setDates(totalDayinMonth[this.state.select_months.indexOf(value)])
    } else if(entity === "year_birth" && value%4 === 0 && this.state.data_registration.month_birth === "Feb" )
      this.setDates(29) 
    this.setState({data_registration:obj}) 
  }

  setWarning(message, path){
    let obj_warning = {
      message:message,
      display_css:"warning_required"
    }
    this.setState({warning:{...this.state.warning, [path]: obj_warning}}, console.log(this.state.warning, obj_warning))
  }

  submitData(){
    let dob = null
    let year = this.state.data_registration.year_birth;
    let month, date = "0"
    if(this.state.data_registration.year_birth !== "0" && this.state.data_registration.month_birth !== "0" && this.state.data_registration.date_birth !== "0"){
      if(10>parseInt(this.state.select_months.indexOf(this.state.data_registration.month_birth)+1))
        month = `0${this.state.select_months.indexOf(this.state.data_registration.month_birth)+1}`
      else
        month = `${this.state.select_months.indexOf(this.state.data_registration.month_birth)+1}`
      if(10>parseInt(this.state.data_registration.date_birth))
        date = `0${this.state.data_registration.date_birth}`
      else
        date = `${this.state.data_registration.date_birth}`
      dob = `${year}-${month}-${date}`
    }
      
    let obj = {
      ...this.state.data_registration,
      dob:dob,
    }
    axios.post(`http://127.0.0.1:3001/api/users/registration`, obj)
    .then(data =>{
      if(data.data.status === "failed"){
        this.setWarning(data.data.message_response, data.data.path)
      } else if(data.data.status === "success"){
          alert('Success Registation')
          this.setState({active_non_active_form:"container blur"})
          this.setState({css_footer:"footer blur"})
          this.setState({hidden_button: {...this.state.hidden_button, display: "inline"}})
      }
    })
    .catch(data =>{
      alert(`Check your internet connection`)
    })
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
                
                {/* TRY SELECT, WITH YOUR OWN STYLE
                <div>
                  <div className="container_select">
                    <div className="select_custom" onClick={() => this.dropDownSelect("month")}>Month &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_month}>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                    </div>
                  </div>

                  <div className="container_select">
                    <div className="select_custom" onClick={() => this.dropDownSelect("date")}>Date &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_date}>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                    </div>
                  </div>

                  <div className="container_select">
                    <div className="select_custom" onClick={() => this.dropDownSelect("year")}>Year &nbsp;<i className="down"></i></div>
                    <div className={this.state.select_hidden_year}>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                      <div className="select_custom_pilih">Month &nbsp;</div>
                    </div>
                  </div>
                  <div className="clear_float"></div>
                </div> */}
                
                
                <select onChange={(e) => this.onChangeValue(e.target.value, "month_birth")}>
                  <option value="0">Month</option>
                    {this.state.select_months.map((month,index) => 
                    <option value={month} key={index}>{month}</option>
                  )}
                </select>

                <select onChange={(e) => this.onChangeValue(e.target.value, "date_birth")}>
                  <option value="0">Date</option>
                  {this.state.select_dates.map((date,index) => 
                    <option value={date} key={index}>{date}</option>
                  )}
                </select>

                <select onChange={(e) => this.onChangeValue(e.target.value, "year_birth")}>
                  <option value="0">Year</option>
                  {this.state.select_years.map((year,index) => 
                    <option value={year} key={index}>{year}</option>
                  )}
                </select>
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
