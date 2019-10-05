'use strict';


let app1 = new Vue({
  el: '#app',
  data: {
    message: 'Hello, Vue!'
  },
  template: '<div>{{message}}</div>'
});


let app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'Upload time is: ' + new Date().toLocaleString()
  },
  template: '<span :title="message">Point at me on a few seconds to see binded title!</span>'
});

let app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  },
  template: '<span v-if="seen">Now U can see me</span>'
});

let app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      {text: 'Learn JavaScript'},
      {text: 'Learn Vue.js'},
      {text: 'Create something Great'}
    ]
  },
  template: '<ol><li v-for="todo in todos">{{todo.text}}</li></ol>'
});

let app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello again, Vue.js!'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('');
    }
  },
  template: '<div><p>{{message}}</p><button @click="reverseMessage">Reverse Message</button></div>'
});

let app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hi-hi-hi, Vue!'
  },
  template: '<div><p>{{message}}</p><input v-model="message" /></div>'
});

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{todo.text}}</li>'
});

let app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      {id: 0, text: 'Vegetables'},
      {id: 1, text: 'Cheeze'},
      {id: 2, text: 'Some over food'}
    ]
  },
  template: '<ol><todo-item v-for="item in groceryList" :todo="item" :key="item.id"></todo-item></ol>'
})
