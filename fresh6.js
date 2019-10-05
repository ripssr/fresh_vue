'use strict';

Vue.config.keyCodes.f1 = 112;

const events1 = new Vue({
    el: '#events1',
    data: {
        counter: 0,
        name: 'Kato Basiro'
    },
    methods: {
        greet: function(event) {
            alert('Hello, ' + this.name + '!');
            if (event) alert(event.target.tagName);
        },
        say: function(message) {
            alert(message)
        },
        warn: function(message, event) {
            if (event) event.preventDefault();
            alert(message);
        },
        doThis: function() {
            alert('Do This!');
        },
        doThat: function() {
            alert('Do That!');
        },
        initCounter: function() {
            alert('Counter is initialized!')
        },
        setDiv: function(event) {
            event.target.innerHTML = 'Pushed F1'
        }
    },
    template: `<div @click.capture="doThis" @click.self="doThat">
        <button @click="counter++" @click.once="initCounter">+1</button>
        <p>Button was pushed {{counter}} times!</p>
        <button @click.stop.prevent="greet">Greet me!</button>
        <button @click="say('Hi!')">Say Hi</button>
        <button @click="say('What?')">Say What</button>
        <button @click="warn('Form can not be sended', $event)">Send</button>
        <a href="https://google.com" @click.stop.prevent>Google</a>
        <div @keyup.f1="setDiv($event)"></div>
    </div>`
});
