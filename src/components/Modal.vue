<template>
  <div class="modal-wrap shadow">
    <div class="modal-header">
      <div class="modal-title">{{popup.modalTitle}}</div>
      <svg
        v-on:click="popup.open = !popup.open"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.68955 5.27555L10.2205 1.74455C10.3208 1.65348 10.4016 1.54299 10.4579 1.41978C10.5142 1.29656 10.5448 1.16319 10.548 1.02777C10.5512 0.892339 10.5269 0.757676 10.4764 0.631948C10.426 0.50622 10.3505 0.392049 10.2547 0.296363C10.1588 0.200677 10.0444 0.12547 9.9186 0.0753079C9.79277 0.0251453 9.65805 0.00107229 9.52263 0.00454961C9.38721 0.00802694 9.25391 0.0389821 9.13081 0.0955367C9.00772 0.152091 8.8974 0.233066 8.80655 0.333547L5.27555 3.86155L1.74555 0.333547C1.65489 0.232129 1.54449 0.150274 1.42111 0.0929899C1.29773 0.0357056 1.16395 0.00419693 1.02798 0.00039141C0.891997 -0.00341411 0.756671 0.0205636 0.630278 0.0708575C0.503885 0.121152 0.389082 0.196704 0.292893 0.292893C0.196704 0.389082 0.121152 0.503885 0.0708575 0.630278C0.0205636 0.756671 -0.00341411 0.891997 0.00039141 1.02798C0.00419693 1.16395 0.0357056 1.29773 0.0929899 1.42111C0.150274 1.54449 0.232129 1.65489 0.333547 1.74555L3.86155 5.27555L0.333547 8.80655C0.238037 8.89879 0.161855 9.00914 0.109446 9.13114C0.0570371 9.25315 0.0294508 9.38437 0.028297 9.51715C0.0271432 9.64993 0.0524449 9.7816 0.102726 9.9045C0.153007 10.0274 0.22726 10.139 0.321152 10.2329C0.415045 10.3268 0.526697 10.4011 0.649593 10.4514C0.77249 10.5016 0.904169 10.527 1.03695 10.5258C1.16973 10.5246 1.30095 10.4971 1.42295 10.4446C1.54496 10.3922 1.6553 10.3161 1.74755 10.2205L5.27555 6.68955L8.80655 10.2205C8.89879 10.3161 9.00914 10.3922 9.13114 10.4446C9.25315 10.4971 9.38437 10.5246 9.51715 10.5258C9.64993 10.527 9.7816 10.5016 9.9045 10.4514C10.0274 10.4011 10.139 10.3268 10.2329 10.2329C10.3268 10.139 10.4011 10.0274 10.4514 9.9045C10.5016 9.7816 10.527 9.64993 10.5258 9.51715C10.5246 9.38437 10.4971 9.25315 10.4446 9.13114C10.3922 9.00914 10.3161 8.89879 10.2205 8.80655L6.68955 5.27555Z"
          fill="#646D82"
        ></path>
      </svg>
    </div>

    <div class="modal-content">
      <form v-on:submit.prevent="createCollection(formData)">
        <text-input
          v-for="key in tblkeys"
          v-bind:key="key"
          v-bind:params="{
            name: key,
            placeholder: key,
            value: null,
            type: 'text',
            _return: inputVal
          }"
        />
        <button class="btn btn-blue">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Textinput from "./Textinput.vue";

export default {
  components: {
    "text-input": Textinput
  },
  props: ["tblkeys", "popup"],
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    inputVal: function(payload) {
      this.formData[payload.name] = payload.val;
    },
    createCollection: function() {}
  }
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  width: 600px;
  min-height: 200px;
  background: #fff;
  box-sizing: border-box;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  background: #f8f8f8;
  padding: 10px 30px;
  box-sizing: border-box;
  img {
    cursor: pointer;
    padding: 5px;
    margin-left: 20px;
  }
}
.modal-content {
  padding: 20px 30px;
}
form {
  width: 100%;
}

@media only screen and (max-width: 650px) {
  .modal-wrap {
    width: 90%;
  }
}
</style>