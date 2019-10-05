'use strict';

Vue.component('blog-post', {
    props: {
        title: {
            type: String,
            required: true
        },
        likes: {
            type: [Number, String],
            default: 1
        },
        isPublished: Boolean,
        commentIds: Array,
        author: {
            type: Object,
            default: function() {
                return { name: 'Kato', age: 20 }
            }
        }
    },
    template: `<div v-if="isPublished">
                 <h3>{{title}}</h3>
                 <span>{{likes}} likes!</span><br><br>
                 <ul><li v-for="comId in commentIds">{{comId}}</li></ul>
                 <span>{{author.name}}, {{author.age}} ages</span>
              </div>`
});

const component = new Vue({
    el: '#component',
    data: {
        post: {
            title: "Hello, Vue!",
            likes: 42,
            isPublished: true,
            commentIds: [234, 266, 273],
            author: {
                name: 'Ridj',
                age: 28
            }
        }
    },
    template: `<blog-post v-bind="post">
               </blog-post>`
});
