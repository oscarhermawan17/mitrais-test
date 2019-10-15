import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Register from './Register'

describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        shallow(<Register/>);
    });

    it('Test mobile number', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().check_phone("807")).toBe(false)
        expect(wrapper.instance().check_phone(null)).toBe(false)
        expect(wrapper.instance().check_phone(undefined)).toBe(false)
        expect(wrapper.instance().check_phone("085701000807")).toBe(true)
        expect(wrapper.instance().check_phone("6285701000807")).toBe(true)
        expect(wrapper.instance().check_phone("+6285701000807")).toBe(true)
        expect(wrapper.instance().check_phone("185701000807")).toBe(false)
    });
     

    it('Email', () => {
        const wrapper = shallow(<Register/>);
        expect(wrapper.instance().check_email(806)).toBe(false)
        expect(wrapper.instance().check_email(null)).toBe(false)
        expect(wrapper.instance().check_email(undefined)).toBe(false)
        expect(wrapper.instance().check_email("testing")).toBe(false)
        expect(wrapper.instance().check_email("abc.do")).toBe(false)
        expect(wrapper.instance().check_email("abc@")).toBe(false)
        expect(wrapper.instance().check_email("abc@c")).toBe(false)
        expect(wrapper.instance().check_email("co@co.")).toBe(false)
        expect(wrapper.instance().check_email("abc@.a.c")).toBe(false)
        expect(wrapper.instance().check_email("abc@a.c")).toBe(true)
        expect(wrapper.instance().check_email("c@a.c")).toBe(true)
        expect(wrapper.instance().check_email("sanggulan@ako.com")).toBe(true)
    });
 });