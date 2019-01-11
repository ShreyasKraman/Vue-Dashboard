import { mount } from '@vue/test-utils';
import login from '../src/components/Login.vue';
import dashboard from '../src/components/Dashboard.vue';

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
        expect(wrapper.vm.$data.username).toBe('abc@gmail.com');
    })

    it('Password binding successfully', () => {
        password = wrapper.find('#passwordEnter');
        password.element.value = 'abc';
        password.trigger('input');
        expect(wrapper.vm.$data.password).toBe('abc');
    })

});

