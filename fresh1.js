'use strict';

let objToFreeze = { foo: 'bar' };
Object.freeze(objToFreeze);

let freeze = new Vue({
  el: '#freeze',
  data: objToFreeze,
  template: `<div><p>{{foo}}</p><button @click="foo = 'buzz'">Change</button></div>`
})

let simpTemp = new Vue({
    el: '#simple_template',
    data: {
        rawHtml: '<span style="color: red">Text should be red.</span>'
    },
    template: `<div><p>Mustache style(as text): {{rawHtml}}</p>
    <p>Directive v-html: <span v-html="rawHtml"></span></p></div>`
});


let attributes = new Vue({
    el: '#attributes',
    data: {
        dynamicId: 'super' + ~~(Math.random() * 10),
        isButtonDisabled: false
    },
    template: `<div :id="dynamicId"><button :disabled="isButtonDisabled">{{dynamicId}}</button></div>`
});

let expressions = new Vue({
    el: '#expressions',
    data: {
        number: ~~(Math.random() * 100),
        ok: true,
        message: 'Welcome to the Wonderland!',
        id: ~~(Math.random() * 10)
    },
    template: `<div :id="'list-' + id">{{number+1}}, {{ok ? 'Yes!' : 'No'}} {{message.split('').reverse().join('')}}</div>`
});

let argums = new Vue({
    el: '#arguments',
    data: {
        url: 'https://google.com'
    },
    methods: {
        doSomething: function() {
            alert(this.url);
        }
    },
    template: `<div><a :href="url" @click.prevent="doSomething">Google</a></div>`
});
