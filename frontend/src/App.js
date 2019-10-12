import React from 'react';
import Footer from './Footer'
// import axios from 'axios'
import './App.css'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      data_registration:{
        mobile_number:"",
        first_name:"",
        last_name:"",
        date_birth:"",
        month_birth:"",
        year_birth:"",
        gender:"",
        email:""
      },
      select_dates:[],
      select_months:["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"], // set default Month
      select_years:[] //Set default year in "ComponentDidMount"
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
    if(entity === "month_birth" && value === "Feb")
      this.setDates(28)
    else if(entity === "year_birth" && value%4 !== 0 && this.state.data_registration.month_birth === "Feb")
      this.setDates(28)
    else if(entity === "month_birth" && value === "Feb" && this.state.data_registration.year_birth%4 === 0 )
      this.setDates(29)
    else if(entity === "year_birth" && value%4 === 0 && this.state.data_registration.month_birth === "Feb" )
      this.setDates(29) 
    else if(entity === "month_birth" && value === "Jan" || value === "Mar" || value === "May" || value === "July" || value==="Aug" || value==="Oct" || value==="Dec")
      this.setDates(31) 
    else if(entity === "month_birth" && value === "Apr" || value === "June" || value === "Sep" || value === "Nov" )
      this.setDates(30) 

    this.setState({data_registration:obj}, () => console.log(this.state.data_registration)) 
  }

  submitData(){

  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="form_validation">
            <form>
              Registration
              <input type="text" name="mobile_number" required placeholder=" Mobile Number" value={this.state.data_registration.mobile_number} onChange={(e) => this.onChangeValue(e.target.value, "mobile_number")}/>
              <input type="text" name="first_name" placeholder=" First name" value={this.state.data_registration.first_name} onChange={(e) => this.onChangeValue(e.target.value, "first_name")}/>
              <input type="text" name="last_name" placeholder=" Last name" value={this.state.data_registration.last_name} onChange={(e) => this.onChangeValue(e.target.value, "last_name")}/>
              Date of Birth
              <div className="custom_select">
                <select onChange={(e) => this.onChangeValue(e.target.value, "month_birth")}>
                  <option value="0">Month</option>
                    {this.state.select_months.map((month,index) => 
                    <option value={month} key={index}>{month}</option>
                  )}
                </select>

                <select>
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

              <div>
                  <input type="radio" name="optradio" />Male
                  <input type="radio" name="optradio" />Female
              </div>
              
              <input type="text" name="last_name" placeholder=" Email" value={this.state.data_registration.email} onChange={(e) => this.onChangeValue(e.target.value, "email")}/>
              <button type="submit" name="register" onCLick={() => this.submitData()}>Register</button>
            </form>
          </div> 
        </div>

        <Footer />
      </div>
      
    )
  }

}

export default App;
