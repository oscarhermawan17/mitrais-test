import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Register from './Register'

describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        shallow(<Register/>);
    });

    it('Test mobile number Regex', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().regex_check("807", "mobile_number")).toBe(false)
        expect(wrapper.instance().regex_check("085701000807", "mobile_number")).toBe(true)
        expect(wrapper.instance().regex_check("6285701000807", "mobile_number")).toBe(true)
        expect(wrapper.instance().regex_check("+6285701000807", "mobile_number")).toBe(true)
        expect(wrapper.instance().regex_check("185701000807", "mobile_number")).toBe(false)
    });

    it('Test First Name, Last Name Mabile number must be required', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().must_be_required("")).toBe(false)
        expect(wrapper.instance().must_be_required(null)).toBe(false)
        expect(wrapper.instance().must_be_required(undefined)).toBe(false)
    });

    it('Test First Name and Last Name using Regex', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().regex_check("Oscar.", "first_name")).toBe(false)
        expect(wrapper.instance().regex_check("Oscar-", "first_name")).toBe(false)
        expect(wrapper.instance().regex_check(".kalo", "first_name")).toBe(false)
        expect(wrapper.instance().regex_check("Oscar-Hermawan", "first_name")).toBe(true)
        expect(wrapper.instance().regex_check("Oscar Hermawan", "first_name")).toBe(true)
        expect(wrapper.instance().regex_check("Oscar'Hermawan", "first_name")).toBe(true)
        expect(wrapper.instance().regex_check("Oscar.Hermawan", "first_name")).toBe(true)
    });

    it('Email', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().regex_check(806, "email")).toBe(false)
        expect(wrapper.instance().regex_check(null, "email")).toBe(false)
        expect(wrapper.instance().regex_check(undefined, "email")).toBe(false)
        expect(wrapper.instance().regex_check("testing", "email")).toBe(false)
        expect(wrapper.instance().regex_check("abc.do", "email")).toBe(false)
        expect(wrapper.instance().regex_check("abc@", "email")).toBe(false)
        expect(wrapper.instance().regex_check("abc@c", "email")).toBe(false)
        expect(wrapper.instance().regex_check("co@co.", "email")).toBe(false)
        expect(wrapper.instance().regex_check("abc@.a.c", "email")).toBe(false)
        expect(wrapper.instance().regex_check("abc@a.c", "email")).toBe(true)
        expect(wrapper.instance().regex_check("c@a.c", "email")).toBe(true)
        expect(wrapper.instance().regex_check("sanggulan@ako.com", "email")).toBe(true)
    });

    it('Set Dates', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().setDates(28)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
        expect(wrapper.instance().setDates(1)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(0)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(30)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
        expect(wrapper.instance().setDates(31)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
        expect(wrapper.instance().setDates(32)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(undefined)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(null)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(32)).toStrictEqual("Date")
        expect(wrapper.instance().setDates(-1)).toStrictEqual("Date") 
    });

    // it('DOB on click', () => {
    //     const wrapper = mount(<Register />);
    //     const cancelBtn = wrapper.find('.select_custom');
    //     cancelBtn.simulate('click');
    // })

    // it('valid component', () => {
    //     const wrapper = shallow(<Register />);
    //     wrapper.setProps({ active: true });
    //     let checkbox = wrapper.find({ type: 'checkbox' });
    //     expect(checkbox.props().checked).to.equal(true);
    //     expect(wrapper.find('.backgroundColor')).to.equal('green');
    //     wrapper.setProps({ active: false });
    //     checkbox = wrapper.find({ type: 'checkbox' });
    //     expect(checkbox.props().checked).to.equal(false);
    //     expect(wrapper.find('.backgroundColor')).to.equal('red');
    //   });
    
});