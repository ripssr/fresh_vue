'use strict';

Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `<label><input type="checkbox" :checked="checked"
                 @change="$emit('change', $event.target.checked)" />{{checked}}</label>`
});

Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    computed: {
        inputListeners: function() {
            let vm = this;
            return Object.assign({}, 
                this.$listeners, {
                    input: function(event) {
                        vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    template: `
    <label>{{label}}
      <input v-bind="$attrs" :value="value" v-on="inputListeners" />
    </label>`
});

const component = new Vue({
    el: '#component',
    data: {
        lovingVue: true,
        input: {
            label: 'Cool label',
            value: 'Init value'
        }
    },
    template: `
    <div>
      <base-checkbox v-model="lovingVue"></base-checkbox><br>
      <base-input v-bind.sync="input" v-model="input.value"></base-input>
    </div>`
});

Vue.component('navigation-link', {
    props: {
        url: String,
        classes: [String, Array]
    },
    template: `<a :href="url" :class="classes"><slot></slot></a>`
});

Vue.component('poop-pee-comp', {
    props: ['name'],
    template: `<div><h3>{{name}}</h3><p>{{name}}</p></div>`
});

const slots = new Vue({
    el: '#slots',
    data: {
        nav: {
            url: 'google.com',
            classes: ['poop', 'pee']
        },
        name: 'Ridj'
    },
    template: `<div>
    <navigation-link v-bind="nav">
      <poop-pee-comp :name="name"></poop-pee-comp>Profile
    </navigation-link>
    </div>`
});

Vue.component('base-layout', {
    template: `<div class="container">
      <header><slot name="header"></slot></header>
      <main><slot></slot></main>
      <footer><slot name="footer"></slot></footer>
    </div>`
});

Vue.component('submit-button', {
    template: `<button type="submit"><slot>Send</slot></button>`
})

const container = new Vue({
    el: '#container',
    template: `<div>
      <base-layout>
        <template slot="header">
          <h1>Header of the page</h1>
          <p>some header info</p>
        </template>
        <p>Paragraph for main content.</p>
        <p>And another one</p>
        <p slot="footer">Contact information</p>
      </base-layout>
      <submit-button>Push!</submit-button>
    </div>`
})

Vue.component('todo-list', {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <slot :todo="todo">{{ todo.text }}</slot>
      </li>
    </ul>`
});

const todo = new Vue({
    el: '#todo',
    data: {
        todos: [
            { id: 1, text: 'To fuck Anya', isComplete: false },
            { id: 2, text: 'To fuck Katya', isComplete: false },
            { id: 3, text: 'To fuck Lisa', isComplete: false },
            { id: 4, text: 'To fuck some prostitute', isComplete: true}
        ]
    },
    template: `
    <todo-list :todos="todos">
      <template slot-scope="{ todo }">
        <span v-if="todo.isComplete">✓ </span>
        <span>{{todo.text}}</span>
        <span v-if="todo.isComplete"> ✓</span>
      </template>
    </todo-list>
    `
});

Vue.component('tab-posts', { 
  data: function () {
    return {
      posts: [
        { 
            id: 1, 
          title: 'Cat Ipsum',
          content: '<p>Dont wait for the storm to pass, dance in the rain kick up litter decide to want nothing to do with my owner today demand to be let outside at once, and expect owner to wait for me as i think about it cat cat moo moo lick ears lick paws so make meme, make cute face but lick the other cats. Kitty poochy chase imaginary bugs, but stand in front of the computer screen. Sweet beast cat dog hate mouse eat string barf pillow no baths hate everything stare at guinea pigs. My left donut is missing, as is my right loved it, hated it, loved it, hated it scoot butt on the rug cat not kitten around</p>'
        },
        { 
            id: 2, 
          title: 'Hipster Ipsum',
          content: '<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>'
        },
        { 
            id: 3, 
          title: 'Cupcake Ipsum',
          content: '<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>'
        }
      ],
      selectedPost: null
    }
  },
    template: `
    <div class="posts-tab">
      <ul class="posts-sidebar">
        <li
          v-for="post in posts"
          v-bind:key="post.id"
          v-bind:class="{ selected: post === selectedPost }"
                    v-on:click="selectedPost = post"
        >
          {{ post.title }}
        </li>
      </ul>
      <div class="selected-post-container">
        <div 
            v-if="selectedPost"
          class="selected-post"
        >
          <h3>{{ selectedPost.title }}</h3>
          <div v-html="selectedPost.content"></div>
        </div>
        <strong v-else>
          Click on a blog title to the left to view it.
        </strong>
      </div>
    </div>
  `
})

Vue.component('tab-archive', { 
    template: '<div>Archive component</div>' 
})

new Vue({
  el: '#dynamic',
  data: {
    currentTab: 'Posts',
    tabs: ['Posts', 'Archive']
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  },
  template: `
  <div>
    <button v-for="tab in tabs" :key="tab" @click="currentTab = tab"
      :class="['tab-button', { active: currentTab === tab }]">
      {{ tab }}
    </button>
    <keep-alive>
      <component :is="currentTabComponent" class="tab"></component>
    </keep-alive>
  </div>`
});

Vue.component('async-example', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            template: `<div>I am async Component!</div>`
        })
    }, 1000)
});

Vue.component('google-map', {
  provide: function () {
    return {
      getMap: this.getMap
    }
  },
  data: function () {
    return {
        map: null
    }
  },
  mounted: function () {
    this.map = new google.maps.Map(this.$el, { 
        center: { lat: 0, lng: 0 },
      zoom: 1
    })
  },
  methods: {
    getMap: function (found) {
      var vm = this
      function checkForMap () {
        if (vm.map) {
          found(vm.map)
        } else {
          setTimeout(checkForMap, 50)
        }
      }
      checkForMap()
    }
  },
    template: '<div class="map"><slot></slot></div>'
})

Vue.component('google-map-marker', {
  inject: ['getMap'],
  props: ['places'],
  created: function () {
    var vm = this
    vm.getMap(function (map) {
      vm.places.forEach(function (place) {
        new google.maps.Marker({
          position: place.position,
          map: map
        })
      })
    })
  },
  render (h) {
    return null
  }
})

new Vue({ 
  el: '#google',
  data: {
    vueConfCities: [
      {
        name: 'Wrocław',
        position: {
          lat: 51.107885,
          lng: 17.038538
        }
      },
      {
        name: 'New Orleans',
        position: {
          lat: 29.951066,
          lng: -90.071532
        }
      }
    ]
  },
  template: `
  <google-map>
    <google-map-marker :places="vueConfCities"></google-map-marker>
  </google-map>
  `
});

const pickaday = new Vue({
    el: 'pickaday',
    data: {
        date: null
    },
    mounted: function() {
        let picker = new Pikaday({
            field: this.$refs.dateInput,
            format: 'YYYY-MM-DD'
        });

        this.$once('hook:beforeDestroy', function() {
            picker.destroy();
        })
    },
    template: `<input ref="dateInput" v-model="date" type="date" />`
});