'use strict';

const store = new Vuex.Store({
  state: {
    messageMixin: 'Hello from Vue.js Mixin!',
    hola: 'Hello world',
    items: [
      {name: 'boo!'},
      {name: 'coco!'},
      {name: 'nandakuku!'}
    ]
  },
  mutations: {},
  getters: {},
  actions: {}
});

Vue.mixin({
  created: function() {
    let myOption = this.$options.myOption;
      if (myOption) console.log(myOption.message);
  }
})

Vue.config.optionMergeStrategies.myOption = Vue.config.optionMergeStrategies.methods;

const myMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log(this.message);
      console.dir(this.$data);
      this.conflicting();
    },
    fooMethod() {
      console.log('foo');
    },
    conflicting() {
      console.log('from Mixin');
    }
  },
  computed: {
    message() {
      return this.$store.state.messageMixin;
    }
  },
  data() {
    return {
      ownMsg: 'goodbye',
      bar: 'def'
    }
  }
};

const component = Vue.extend({
  myOption: {
    message: 'Hi option!'
  },
  mixins: [myMixin],
  template: `<h2>Component One</h2>`,
  data() {
    return {
      ownMsg: 'hello',
      foo: 'abc'
    }
  },
  methods: {
    barMethod() {
      console.log('bar');
    },
    conflicting() {
      console.log('from self component')
    }
  }
});

Vue.directive('demo',  function(el, binding, vnode) {
    let s = JSON.stringify;
    el.innerHTML = 'name: ' + s(binding.name) + '<br>' +
          'value: ' + s(binding.value.message) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: ' + s(binding.arg) + '<br>' +
          'modifiers: ' + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ');
    el.style.backgroundColor = binding.value.color;
})


const app1 = new Vue({
  el: '#app1',
  myOption: {
    message: 'Hi option!'
  },
  store,
  components: {
    compOne: component,
  },
  directives: {
    focus: {
      bind(el) {
        el.placeholder = 'Input your code';
      },
      inserted(el) {
        el.focus();
      },
      componentUpdated(el) {
        el.placeholder = 'So, component was changed :)'
      }
    }
  },
  data: {
    value: {
      message: 'Hello!',
      color: 'blue'
    }
  },
  template: `
  <div id="app1">
    <comp-one></comp-one>
    <input v-model="value.message" /><br><input v-focus/>
    <br><input v-model="value.color"/>
    <div id="hook" v-demo:foo.a.b="value"></div>
  </div>`
});
/*
Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
});
*/

Vue.component('anchored-heading', {
  render: function(createElement) {
    return createElement('h' + this.level, [
        createElement('a', {
            attrs: {
              name: this.holalink,
              href:'#' + this.holalink
            }
          },
         this.hola + '!')]
      );
  },
  props: {
    level: {
      type: Number,
      required: true
    },
    hola: {
      type: String,
      required: true
    }
  },
  computed: {
    holalink() {
      return this.hola.toLowerCase().split(' ').join('-');
    }
  }
})

Vue.component('fabric', {
  render: function(createElement) {
    let vm = this;
    let num2 = this.num;
    return createElement('div',
      Array.apply(null, { length: this.num}).map(function() {
        let number = this.num - --num2;
        return createElement(
          'h2', {
            class: {
              sex: true,
              lame: false
            },
            style: {
              color: 'rgba(' + (number-1) + '0, 0, 0, .7)'
            },
            attrs: {
              id: 'header' + number
            },
            domProps: {
              innerHTML: this.$slots.default[0].text + ' ' + number
            },
            on: {
              click: function() {
                alert(number)
              }
            }
          }, this.$slots.default
        );
      }, this)
    )
  },
  props: {
    num: {
      type: Number,
      default: 1
    }
  }
})

Vue.component('render-list', {
  props: ['items'],
  render: function(createElement) {
    if (this.items.length) {
      return createElement('ul', this.items.map(function(item) {
        return createElement('li', item.name)
      }))
    } else {
      return createElement('p', 'Nothing to list :(');
    }
  }
})

Vue.component('render-input', {
  props: ['value'],
  render: function(createElement) {
    let self = this;
    return createElement('input', {
      domProps: {
        value: self.value
      },
      on: {
        input: function(event) {
          self.$emit('input', event.target.value)
        }
      }
    })
  }
})

Vue.filter('capitalize', function(value, num=1) {
  if (!value) return '';
  value = value.toString();
  return Array.apply(null, { length: num }).map(function() {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }).join(' ');
})

Vue.filter('ex', function(value, s=false) {
  return s ? 'Uhh, ' + value : 'Ex-Ex-Ex' + value;
})

const render = new Vue({
  el: '#render',
  store,
  computed: Vuex.mapState({
    items: state => state.items
  }),
  data: {
    value: 'placeholder',
    inputValue: 'temp'
  },
  template: `
  <div>
    <anchored-heading :level="1" :hola="'Hello world'"></anchored-heading>
    <fabric :num="13">List</fabric>
    <render-list :items="items"></render-list>
    <render-input v-model="value"></render-input>
    <input v-model="inputValue" />
    <p>{{inputValue | capitalize(2) | ex(true)}}</p>
  </div>`
})
