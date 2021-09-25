import Vue from 'vue'
import router from './routers'
import App from './pages/App/App'
// import { sync } from 'vuex-router-sync'
// import store from './store'
// import ls from 'store2'

// sync(store, router)
// Vue.use(Http);

window.eventHub = new Vue()
const app = new Vue({
    router,
    render(h) {
        return (<App/>)
    },
    el: '#app'
})
