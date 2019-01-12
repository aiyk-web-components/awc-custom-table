import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import AwcCustomTable from "./AwcCustomTable.vue";

const CustomElement = wrap(Vue, AwcCustomTable);
window.customElements.define('awc-custom-table', CustomElement);
Vue.config.productionTip = false

new Vue({
  render: h => h(AwcCustomTable),
}).$mount('#app')
