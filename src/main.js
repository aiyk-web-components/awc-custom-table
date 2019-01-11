import Vue from 'vue'
import AwcTable from "./AwcTable.vue";

Vue.config.productionTip = false

new Vue({
  render: h => h(AwcTable),
}).$mount('#app')
