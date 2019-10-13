import React from 'react';
import '../Style.css'

const Warning = (props)  =>
    <div className="make_relative">
        <div className={props.warning_props.display_css}>
            {props.warning_props.message}
        </div>
    </div>  

export default Warning;
