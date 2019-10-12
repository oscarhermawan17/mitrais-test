import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState({
    mobile_number:"",
    first_name:"",
    last_name:"",
    date_birth:"",
    month_birth:"",
    year_birth:"",
    gender:"",
    email:""
  })

  const [months, setMonth] = useState(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]);
  const [dates, setDate] = useState(0);
  const [years, setYear] = useState([]);

  useEffect(() => {
    let get_year = new Date();
    var full_year = get_year.getFullYear();
    let total_year = []
    for(let i=1980; i<=parseInt(full_year); i++){
      total_year.push(i)
    }
    setYear(total_year)
    
  }, []);

  const onChangeValue = e => {

  }

  return (
    <div className="container">
        <input type="text" name="mobile_number" value={data.mobile_number} placeholder=" Mobile Number" onChange={(e) => onChangeValue(e, value)}/>
        <input type="text" name="first_name" placeholder=" First name" />
        <input type="text" name="last_name" placeholder=" Last name"/>
        Date of Birth
        <div className="custom_select">
          <select onChange={(e) => setData({...data, date_birth:e.target.value})}>
            <option value="0">Month</option>
            {months.map((month,index) => 
              <option value={month} key={index}>{month}</option>
            )}
          </select>

          <select onChange={(e) => setData({...data, month_birth:e.target.value})}>
            <option value="0">Date</option>
            {years.map((year,index) => 
              <option value={year} key={index}>{year}</option>
            )}
          </select>

          <select onChange={(e) => setData({...data, year_birth:e.target.value})}>
            <option value="0">Year</option>
            {years.map((year,index) => 
              <option value={year} key={index}>{year}</option>
            )}
          </select>
        </div>
        
        <input type="text" name="last_name" placeholder=" Email"/>
        <button type="submit" onClick={() => console.log(data)}name="register">Register</button>
    </div>
  );
}

export default App;
