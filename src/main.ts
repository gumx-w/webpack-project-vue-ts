import Vue from 'vue';
import Home from "./view/Home.vue";

new Vue({
    render:(h:any) => h(Home)
}).$mount('#app')
