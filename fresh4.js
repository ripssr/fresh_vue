'use strict';

const condition = new Vue({
    el: '#condition',
    data: {
        ok: true
    },
    template: `<div>
        <h1 v-if="ok">Yes</h1><h2 v-else>No</h2>
        <template v-if="ok">
            <h1>Header</h1>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </template>
        <div v-if="Math.random() > 0.5">You can see me</div>
        <div v-else>Can't see me!</div>
    </div>`
});

const elseifcondition = new Vue({
    el: '#else-if-condition',
    data: {
        type: 'B'
    },
    template: `<div>
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else-if="type === 'C'">C</div>
    <div v-else>Not A/B/C</div></div>
    `
});

const reusable = new Vue({
    el: '#reusable',
    data: {
        loginType: 'username'
    },
    template: `<div>
    <template v-if="loginType === 'username'">
        <label>User Name</label>
        <input placeholder="Input username" />
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Input email" />
    </template>
    </div>`
});

const notreusable = new Vue({
    el: '#notreusable',
    data: {
        loginType: 'email'
    },
    template: `<div>
    <template v-if="loginType === 'username'">
        <label>User Name</label>
        <input placeholder="Input username" key="username-input" />
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Input email address" key="email-input" />
    </template>
    </div>`
});

const show = new Vue({
    el: '#show',
    data: {
        ok: true
    },
    template: `<div><h1 v-show="ok">Hello!</h1></div>`
});
