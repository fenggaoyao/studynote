import './app.scss'

import Vue from 'vue'
import Preview from 'components/platform/Preview/Preview'
import utils from './utils'

window.eventHub = new Vue()
const app = new Vue({
    render(h) {
        return (<Preview modelId={utils.getQueryString('modelId')}/>)
    },
    el: '#app'
})
