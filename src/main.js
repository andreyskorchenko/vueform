import Vue from "vue";
import App from "./App.vue";
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.config.devtool = true;

Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
}).$mount("#app");