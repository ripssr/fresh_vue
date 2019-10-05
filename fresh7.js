'use strict';

const inputs = new Vue({
    el: '#inputs',
    data: {
        holder: 'Redact me!',
        message: '',
        message2: '',
        checked: true,
        checkedNames: ['Kato'],
        picked: 'two'
    },
    template: `<div>
        <input v-model="message" :placeholder="holder" />
        <p>Inputed message: {{message}}</p>
        <span>Inputed manylines message:</span>
        <p style="white-space: pre-line;">{{message2}}</p><br>
        <textarea v-model.lazy="message2" :placeholder="holder"></textarea><br>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox">{{checked}}</label><br><br>
        <input type="checkbox" id="kato" value="Kato" v-model="checkedNames" />
        <label for="kato">Kato</label>
        <input type="checkbox" id="ridj" value="Ridj" v-model="checkedNames" />
        <label for="ridj">Ridj</label>
        <input type="checkbox" id="srj" value="Sergio Romano Jr." v-model="checkedNames" />
        <label for="srj">Sergio Romano Jr.</label><br>
        <span>Checked names: {{checkedNames}}</span><br><br>
        <input type="radio" id="one" value="one" v-model="picked" />
        <label for="one">One</label><br>
        <input type="radio" id="two" value="two" v-model="picked" />
        <label for="two">Two</label><br><span>Picked: {{picked}}</span><br><br>
    </div>`
});

const selects = new Vue({
    el: '#selects',
    data: {
        selected: [],
        options: [
            {text: 'One', value: 'A'},
            {text: 'Two', value: 'B'},
            {text: 'Three', value: {number: 123}}
        ],
        toggle: false,
        pick: true,
        rad: 100
    },
    template: `<div>
      <select v-model="selected" multiple>
        <option disabled value="">Choose one of variants</option>
        <option v-for="option in options" :value="option.value">{{option.text}}</option>
      </select>
      <span>Choosen: {{selected}}</span><br><br>
      <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
      <input type="radio" v-model="pick" :value="rad" />
    </div>`
});
