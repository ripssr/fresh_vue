'use strict';

Vue.component('button-counter', {
    data: function() {
        return {
            count: 0
        }
    },
    template: `<button @click="count++">You clicked me {{count}} times.</button>`
});

Vue.component('blog-post', {
    props: ['post'],
    template: `<div><h3>{{post.title}}</h3>
    <button @click="$emit('enlarge-text', 0.1)">Enlarge text</button>
    <div v-html="post.content"></div></div>`
});

Vue.component('custom-input', {
    props: ['value'],
    template: `<input :value="value" @input="$emit('input', $event.target.value)" />`
});

Vue.component('alert-box', {
    template: `<div><strong>Error!</strong><slot></slot></div>`
});

const components = new Vue({
    el: '#components',
    data: {
        posts: [
            { id: 1, title: 'My journet with Vue', content: '<span>Todododoo</span><p>Proto 1!</p>' },
            { id: 2, title: 'Blogging with Vue', content: '<ul><li>Tad</li><li>dad</li><li>da</li><li>da</li>' },
            { id: 3, title: 'Why Vue is so fun', content: '<h4>Tram</h4><span>a</span><ol><li>pa</li><li>pa</li><li>pa</li></ol><span>p</span>' }
        ],
        postFontSize: 1,
        searchText: 'search'
    },
    template: `<div :style="{fontSize: postFontSize + 'em'}">
    <button-counter></button-counter><br>
    <input v-model="searchText"><br>
    <button-counter></button-counter><br>
    <custom-input v-model="searchText"></custom-input><br>
    <blog-post v-for="post in posts" :key="post.id" :post="post"
        @enlarge-text="postFontSize += $event"></blog-post>
    <alert-box>Something bad happens</alert-box>
    </div>`
});

Vue.component('tab-home', {
    template: `<div>Home component</div>`
});

Vue.component('tab-posts', {
    template: `<div>Posts component</div>`
});

Vue.component('tab-archive', {
    template: `<div>Archive component</div>`
});

const tab = new Vue({
    el: '#dynamic',
    data: {
        currentTab: 'Home',
        tabs: ['Home', 'Posts', 'Archive']
    },
    computed: {
        currentTabComponent: function() {
            return 'tab-' + this.currentTab.toLowerCase();
        }
    },
    template: `<div class="demo">
      <button v-for="tab in tabs" :key="tab" @click="currentTab = tab"
        :class="['tab-button', {active: currentTab === tab}]">{{tab}}</button>
      <component :is="currentTabComponent" class="tab"></component>
    </div>`
});
