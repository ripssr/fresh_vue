'use strict';

const binding = new Vue({
    el: '#binding',
    data: {
        classObject: {
            active: true,
            'text-danger': false
        }
    },
    template: `<div class="static" :class="classObject">Some text</div>`
});

Vue.component('my-component', {
    template: '<p class="foo bar">Hello!</p>'
})

const component = new Vue({
    el: '#componentCl',
    data: {
        isActive: true
    },
    template: `<my-component class="baz boo" :class="{active: isActive}"></my-component>`
});

const stylebind = new Vue({
    el: '#stylebind',
    data: {
        styleObject: {
            color: 'red',
            fontSize: '30px'
        },
        overridingStyles: {
            background: 'bisque',
            color: 'aqua',
            display: ['-webkit-box', '-ms-flexbox', 'flex']
        }
    },
    template: `<div :style="[styleObject, overridingStyles]">
        New Hello!
    </div>`
})
