'use strict';

let computed1 = new Vue({
    el: '#computed1',
    data: {
        message: 'Hello, bubulka!',
        nowTime: 0
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        },
        computedNow: function() {
            return Date.now();
        }
    },
    methods: {
        now: function() {
            this.nowTime = Date.now();
        }
    },
    template: `<div><p>Original: {{message}}</p><p>Reversed: {{reversedMessage}}</p>
    <button @click="now">{{computedNow}}, {{nowTime}}</button></div>`
});

let watch = new Vue({
    el: '#watch',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function(val) {
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: function(val) {
            this.fullName = this.firstName + ' ' + val;
        }
    },
    template: '<div>{{fullName}}</div>'
});

let nowatch = new Vue({
    el: '#nowatch',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function() {
            return this.firstName + '' + this.lastName;
        }
    },
    template: '<div>{{fullName}}</div>'
});

const setter = new Vue({
    el: '#setter',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            get: function() {
                return  this.firstName + ' ' + this.lastName;
            },
            set: function(newValue) {
                let names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1]
            }
        }
    },
    template: '<div>{{fullName}}</div>'
});

const watchExample = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'Until you ask your question I can not answer!'
    },
    watch: {
        question: function(newQuest, oldQuest) {
            this.answer = 'Waiting until you finish your question...';
            this.debouncedGetAnswer();
        }
    },
    created: function() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    },
    methods: {
        getAnswer: function() {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Question usualy ends up by question makr ;-)';
                return;
            }
            this.answer = 'Thinking...';
            let vm = this;
            axios.get('https://yesno.wtf/api')
                .then(function(response) {
                    vm.answer = _.capitalize(response.data.answer);
                })
                .catch(function(error) {
                    vm.answer = 'Error! Cannot connect to API! ' + error;
                })
        }
    },
    template: `<div>
    <p>Ask your question:
        <input v-model="question" />
    </p>
    <p>{{answer}}</p>
    </div>`
});
