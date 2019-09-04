import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import store from './store'

Vue.use(VueMaterial)


new Vue({
	store,
	beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  	render: h => h(App),
}).$mount('#app')
