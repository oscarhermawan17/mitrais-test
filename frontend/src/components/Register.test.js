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
 });