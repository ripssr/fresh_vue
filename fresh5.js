'use strict';

const list = new Vue({
    el: '#list',
    data: {
        parentMessage: 'Parent',
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    },
    template: `<ul><li v-for="(item, index) of items">
    {{parentMessage}} - {{index}} - {{item.message}}</li></ul>`
})

const object = new Vue({
    el: '#object',
    data: {
        object: {
            firstName: 'Kato',
            lastName: 'Basiro',
            age: 28
        }
    },
    template: `<ul><li v-for="(value, key, index) in object">
    {{index}}. {{key}}: {{value}}</li></ul>`
});


Vue.set(list.items, 2, {message: 'Doo'});
list.items.splice(3, 1, {message: 'Doo'});
list.items.splice(3);
Vue.set(object.object, 'retire', 55);
object.object = Object.assign({}, object.object, {
    favoriteColor: 'Vue Green'
})

const computed = new Vue({
    el: '#computed',
    data: {
        numbers: [1,2,3,4,5]
    },
    computed: {
        evenNumbers: function() {
            return this.numbers.filter(function(number) {
                return number % 2 === 0;
            });
        }
    },
    methods: {
        odd: function(numbers) {
            return numbers.filter(function(number) {
                return number % 2 !== 0;
            });
        }
    },
    template: `<ul><li v-for="n in evenNumbers">{{n}}: <ul>
    <li v-for="num in odd(numbers)"> {{num}}</li></ul></li></ul>`
});

const range = new Vue({
    el: '#range',
    data: {
        num: 10
    },
    template: '<div><span v-for="n in num">{{n}} </span></div>'
});

const template = new Vue({
    el: '#template',
    data: {
        items: [
            { msg: 'Hello' },
            { msg: 'Vue!' }
        ]
    },
    template: `<ul><template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
    </template></ul>`
});

const todo = new Vue({
    el: '#todo',
    data: {
        todos: [
            { name: 'Finish Vue Docs', isComplete: false },
            { name: 'Find friend', isComplete: true },
            { name: 'Play games', isComplete: false },
            { name: 'Listen radio', isComplete: true },
            { name: 'Find girlfriend', isComplete: false }
        ],
        shouldRenderTodos: true
    },
    template: `<ul v-if="shouldRenderTodos">
    <li v-for="todo in todos" v-if="!todo.isComplete">
    {{ todo.name }}</li></ul>`
});

Vue.component('todo-item', {
    template: `
    <li>
        {{ title }}
        <button @click="$emit('remove')">Delete</button>
    </li>
    `,
    props: ['title']
});

const component = new Vue({
    el: '#component',
    data: {
        newTodoText: '',
        todos: [
            { id: 1, title: 'Wash dishes' },
            { id: 2, title: 'Trash out' },
            { id: 3, title: 'Cut of grass' }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function() {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            });
            this.newTodoText = '';
        }
    },
    template: `
    <div>
      <form @submit.prevent="addNewTodo">
        <label for="new-todo">Add Todo Task</label>
        <input v-model="newTodoText" id="new-todo" placeholder="Example: feed cat" />
        <button>Add</button>
      </form>
      <ul>
        <li is="todo-item" v-for="(todo, index) in todos" :key="todo.id"
            :title="todo.title" @remove="todos.splice(index, 1)"></li>
      </ul>
    </div>
    `
});
