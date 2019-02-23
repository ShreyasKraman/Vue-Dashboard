import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import { expect } from "chai"
import { describe, beforeEach, it } from 'mocha'
import Vuetify from 'vuetify'


import login from '../src/components/user-login/Login.vue'

Vue.use(Vuex)
Vue.use(Vuetify)


describe('Login.vue tests', () => {

    const wrapper = mount(login);

    describe('Component tests', () => {

        it('displays login component', () => {
            expect(typeof login.data).to.equal('function');
        });
    
        it('has a login button', () => {
            const loginButton = wrapper.find('button');
            expect(loginButton.text()).to.equal("Login")
        });

    });

    var swal;

    describe('Functionality tests', () => {

        beforeEach(() => {
            swal = sinon.spy();
        });

        it('onSubmit/login function called',() => {
            const loginButton = wrapper.find('button');
            expect(loginButton.text()).to.equal("Login")
    
            const onSubmitMethodStub = sinon.stub();
            wrapper.setMethods({onSubmit:onSubmitMethodStub});
            loginButton.trigger('click');

            expect(onSubmitMethodStub.called).to.equal(true)
        });
    
        it('error pop up on wrong username/password',() => {
            const loginButton = wrapper.find('button');

            const username = wrapper.find('#username');
            username.element.value = 'abc';
            username.trigger('input')

            const password = wrapper.find('#password');
            password.element.value = '123';
            password.trigger('input');
            loginButton.trigger('click');

            expect(swal);
        });

    })

});

