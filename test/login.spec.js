import { mount } from '@vue/test-utils';
import login from '../src/components/user-login/Login.vue';

const wrapper = mount(login);

describe('Login component test', () => {
    
    var username, password;

    it('Displays login component', () => {
        expect(typeof login.data).toBe('function');
    })

    it('Username binding successfully', () => {
        username = wrapper.find('#emailAddress');
        username.element.value = 'abc@gmail.com';
        username.trigger('input');
        expect(wrapper.vm.$data.form.username).toBe('abc@gmail.com');
    })

    it('Password binding successfully', () => {
        password = wrapper.find('#passwordEnter');
        password.element.value = 'abc';
        password.trigger('input');
        expect(wrapper.vm.$data.form.password).toBe('abc');
    })

});

