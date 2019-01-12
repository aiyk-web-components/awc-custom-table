<template>
  <div id="app">
    <div id="data-table" class="table-wrap">
      <div class="pre-table">
        <div class="table-titles">
          <div class="table-title">{{metaData.tblTitle}}</div>
          <div class="table-subtitle">{{metaData.tblSubtitle}}</div>
        </div>
        <div class="table-ctas">
          <!-- <button v-on:click="popup.open = !popup.open" class="btn btn-blue">
            <img src="https://vue-data-table.firebaseapp.com/plus-white.svg"> Add New
          </button>-->
        </div>
      </div>

      <div class="tbl-controls">
        <div class="search-wrap">
          <select v-model="searchKey">
            <option v-for="key in getCollections_keys" v-bind:key="key">{{key}}</option>
          </select>
          <input v-model="search" type="search" placeholder="search...">
        </div>
        <pagination v-bind:collection="loadedCollection" v-bind:pagination_data="pagination_data"/>
      </div>

      <div class="tbl">
        <div>
          <div class="tr thead">
            <div v-if="metaData.trCheckbox" class="td-actions"></div>
            <div
              v-for="th in getCollections_keys"
              v-bind:key="th"
              v-on:click="sortCollections([th])"
              class="th"
            >
              <span>{{th}}</span>
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 1.5H0V0.5H14V1.5ZM12 6.5H2V5.5H12V6.5ZM4 11.5H10V10.5H4V11.5Z"
                  fill="#646D82"
                ></path>
              </svg>
            </div>
            <div v-if="metaData.trActions" class="td-actions"></div>
          </div>
        </div>
        <div v-for="(item, index) in loadedCollection.data" v-bind:key="index">
          <div v-if="item != undefined && item != null" class="tr tbody">
            <div v-if="metaData.trCheckbox" class="td-actions">
              <input type="checkbox">
            </div>
            <div v-for="(val, key) in item" v-bind:key="key" class="td">
              <span v-show="!item_to_edit(index)">{{val}}</span>
              <input
                v-bind:value="val"
                v-show="item_to_edit(index)"
                @blur="updateCollections([$event, key, item.ID]), editTr_onclick('')"
                type="text"
                class="td-edit-input"
              >
            </div>
            <div v-if="metaData.trActions" class="td-actions dropdown-wrap">
              <svg
                v-on:click="tblmenuitem_onclick(index)"
                class="btn-hollow btn-elipsis-v-center btn-x0"
                width="4"
                height="18"
                viewBox="0 0 4 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 2C4 2.39556 3.8827 2.78224 3.66294 3.11114C3.44318 3.44004 3.13082 3.69638 2.76537 3.84776C2.39992 3.99913 1.99778 4.03874 1.60982 3.96157C1.22186 3.8844 0.865492 3.69392 0.585787 3.41421C0.306082 3.13451 0.115601 2.77814 0.0384303 2.39018C-0.0387401 2.00222 0.000866562 1.60008 0.152242 1.23463C0.303617 0.869181 0.559962 0.556824 0.88886 0.337061C1.21776 0.117298 1.60444 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.960859 4 1.46957 4 2ZM4 9C4 9.39556 3.8827 9.78224 3.66294 10.1111C3.44318 10.44 3.13082 10.6964 2.76537 10.8478C2.39992 10.9991 1.99778 11.0387 1.60982 10.9616C1.22186 10.8844 0.865492 10.6939 0.585787 10.4142C0.306082 10.1345 0.115601 9.77814 0.0384303 9.39018C-0.0387401 9.00222 0.000866562 8.60008 0.152242 8.23463C0.303617 7.86918 0.559962 7.55682 0.88886 7.33706C1.21776 7.1173 1.60444 7 2 7C2.53043 7 3.03914 7.21071 3.41421 7.58579C3.78929 7.96086 4 8.46957 4 9ZM4 16C4 16.3956 3.8827 16.7822 3.66294 17.1111C3.44318 17.44 3.13082 17.6964 2.76537 17.8478C2.39992 17.9991 1.99778 18.0387 1.60982 17.9616C1.22186 17.8844 0.865492 17.6939 0.585787 17.4142C0.306082 17.1345 0.115601 16.7781 0.0384303 16.3902C-0.0387401 16.0022 0.000866562 15.6001 0.152242 15.2346C0.303617 14.8692 0.559962 14.5568 0.88886 14.3371C1.21776 14.1173 1.60444 14 2 14C2.53043 14 3.03914 14.2107 3.41421 14.5858C3.78929 14.9609 4 15.4696 4 16Z"
                  fill="#646D82"
                ></path>
              </svg>
              <div class="dropdown-wrap">
                <transition name="slide-fade">
                  <ul
                    v-show="item_to_show(index)"
                    v-on:click="tblmenuitem_onclick('')"
                    class="dropdown-menu"
                  >
                    <!-- <li>
                      <img src="https://vue-data-table.firebaseapp.com/eye.svg"> View
                    </li>-->
                    <li v-on:click.stop="editTr_onclick(index), tblmenuitem_onclick('')">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.332 13H0.492C0.361513 13 0.236371 12.9482 0.144103 12.8559C0.0518356 12.7636 0 12.6385 0 12.508V10.668C0.0182671 10.3539 0.143146 10.0555 0.354 9.822L7.766 2.41L10.59 5.234L3.178 12.646C2.94469 12.8571 2.64615 12.9821 2.332 13ZM11.3 4.528L8.472 1.7L9.885 0.292C9.97659 0.199484 10.0856 0.126043 10.2058 0.075923C10.3259 0.0258027 10.4548 -2.2656e-06 10.585 1.49192e-10C10.7181 0.000329895 10.8498 0.0270096 10.9725 0.0784998C11.0952 0.12999 11.2065 0.205271 11.3 0.3L12.7 1.7C12.7949 1.79353 12.8703 1.90498 12.9218 2.0279C12.9733 2.15081 12.9999 2.28273 13 2.416C12.9999 2.54618 12.9741 2.67506 12.924 2.7952C12.8739 2.91534 12.8005 3.02437 12.708 3.116L11.3 4.527V4.528Z"
                          fill="#646D82"
                        ></path>
                      </svg>
                      Edit
                    </li>
                    <li v-on:click.stop="deleteCollection([item.ID]), tblmenuitem_onclick('')">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 3.75V2.25H6.75V3.75H2.25V5.25H15.75V3.75H11.25Z"
                          fill="#F46363"
                        ></path>
                        <path
                          d="M3.75 6.00006V15.0001C3.75 15.8273 4.42275 16.5001 5.25 16.5001H12.75C13.5773 16.5001 14.25 15.8273 14.25 15.0001V6.00006H3.75ZM8.25 13.5001H6.75V9.00006H8.25V13.5001ZM11.25 13.5001H9.75V9.00006H11.25V13.5001Z"
                          fill="#F46363"
                        ></path>
                      </svg> Delete
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tbl-controls">
        <pagination v-bind:collection="loadedCollection" v-bind:pagination_data="pagination_data"/>
        <div v-if="metaData.tblSummary" class="table-subtitle">{{metaData.tblSummary}}</div>
      </div>

      <transition name="fade">
        <div v-if="popup.open" class="modal-overlay">
          <modal v-bind:tblkeys="getCollections_keys" v-bind:popup="popup"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Pagination from "./components/Pagination.vue";
import Modal from "./components/Modal.vue";

export default {
  mounted() {
    //console.log(this.props);
    // if (this.props != undefined) {
    //   this.metaData = this.props.metaData;
    //   this.collections = this.props.collections;
    //   this.collections_keys = this.getTableKeys;
    // }
  },
  props: ["metaData", "collections"],
  components: {
    pagination: Pagination,
    modal: Modal
  },
  data() {
    return {
      ddmenu_tblmenu: false,
      ddmenu_tblitem: false,
      clickItemIndex: null,
      editTrIndex: null,

      search: null,
      searchKey: null,

      pagination_data: {
        currentPage: 1,
        perPage: 5,
        totalPages: 0
      },

      popup: {
        open: false,
        modalTitle: "New Data Entry"
      },
      sortState: true,
      getdata: null
    };
  },
  methods: {
    item_to_show: function(i) {
      return this.clickItemIndex === i;
    },
    item_to_edit: function(i) {
      return this.editTrIndex === i;
    },
    tblmenu_onclick: function() {
      this.ddmenu_tblmenu = !this.ddmenu_tblmenu;
    },
    tblmenuitem_onclick: function(itemIndex) {
      if (this.clickItemIndex == itemIndex) {
        this.clickItemIndex = null;
      } else {
        this.clickItemIndex = itemIndex;
      }
      this.ddmenu_tblitem = !this.ddmenu_tblitem;
    },
    editTr_onclick: function(itemIndex) {
      if (this.editTrIndex == itemIndex) {
        this.editTrIndex = null;
      } else {
        this.editTrIndex = itemIndex;
      }
    },
    deleteTr_onclick: function(itemIndex) {
      this.collections.splice(itemIndex, 1);
    },
    paginate: function(collection, page, numItems) {
      if (!Array.isArray(collection)) {
        throw `Expect array and got ${typeof collection}`;
      }
      const currentPage = parseInt(page);
      const perPage = parseInt(numItems);
      const offset = (page - 1) * perPage;
      const paginatedItems = collection.slice(offset, offset + perPage);

      return {
        currentPage,
        perPage,
        total: collection.length,
        totalPages: Math.ceil(collection.length / perPage),
        data: paginatedItems
      };
    },

    sortCollections: function(sort_key) {
      this.sortState = !this.sortState;
      if (this.sortState) {
        this.collections.sort(function(a, b) {
          if (a[sort_key] < b[sort_key]) {
            return -1;
          }
          if (a[sort_key] > b[sort_key]) {
            return 1;
          }
          return 0;
        });
      } else {
        this.collections.sort(function(a, b) {
          if (a[sort_key] > b[sort_key]) {
            return -1;
          }
          if (a[sort_key] < b[sort_key]) {
            return 1;
          }
          return 0;
        });
      }
    },

    filter: function() {
      const search_criteria = this.search.toLowerCase();
      this.getdata = this.collections.filter(item => {
        if (item[this.searchKey]) {
          const to_compare = item[this.searchKey].toLowerCase();
          return to_compare.includes(search_criteria);
        }
      });
    }
  },
  computed: {
    getCollections_keys: function() {
      if (this.collections) {
        let obj = this.collections;
        for (var prop in obj) {
          return Object.keys(obj[prop]);
        }
      }
      return null;
    },
    loadedCollection: function() {
      const _this = this;
      _this.getdata = this.collections;

      if (this.search && this.searchKey) {
        this.filter();
      }

      if (!this.pagination_data.currentPage) {
        _this.pagination_data.currentPage = 1;
      }
      if (!this.pagination_data.perPage) {
        _this.pagination_data.perPage = 5;
      }
      return this.paginate(
        this.getdata,
        _this.pagination_data.currentPage,
        _this.pagination_data.perPage
      );
    }
  }
};
</script>

<style lang="scss">
/*shadow rules*/
.shadow {
  -webkit-box-shadow: 0 8px 16px rgba(148, 148, 148, 0.25);
  -moz-box-shadow: 0 8px 16px rgba(148, 148, 148, 0.25);
  box-shadow: 0 8px 16px rgba(148, 148, 148, 0.25);
}

/*html element level style rules*/
html,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  font-size: 10px;
  margin: 0;
  padding: 0;
  color: #040e28;
}

body {
  font-size: 14px;
  color: #040e28;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  outline: 0;
}

li {
  outline: 0;
}

#app {
  padding: 20px;
}
.btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  outline: 0;
  border: 0;
  img {
    padding-right: 10px;
  }
}
.btn-blue {
  background: #1f7fff;
  color: #fff;
  &:active {
    background: #0071bc;
  }
  &:hover {
    background: #3fa9f5;
  }
}
.btn-hollow {
  background-color: transparent;
  border: 1px solid #fff;
  color: #040e28;
  cursor: pointer;
  &:hover {
    border: 1px solid #eee;
    background-color: #fff;
  }
  outline: 0;
}
.btn-grey-outline {
  border: 1px solid #aaa;
}
.btn-x0 {
  padding: 5px 10px;
}
/***** DROP DOWN MENU STYLE RULES *****/
.dropdown-wrap {
  position: relative;
}
.dropdown-wrap .dropdown-menu {
  display: block;
  position: absolute;
  width: max-content;
  right: 0;
  top: 23px;
  z-index: 1;
  background-color: #fff;
  padding: 3px 0;
}
.dropdown-wrap .dropdown-menu li {
  cursor: pointer;
  padding: 3px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f2f7;
  min-height: 30px;
}
.dropdown-wrap .dropdown-menu li:hover {
  background-color: #f9fafc;
}
.dropdown-wrap .dropdown-menu li svg {
  margin-right: 10px;
  display: inline;
}
.dropdown-wrap .dropdown-menu .ddmenu-active {
  color: #1f7fff;
}

.clickable {
  cursor: pointer;
}
.search-wrap {
  display: flex;
  border-radius: 2px;
  border: 1px solid #dce1ea;
  background-color: #f9fafc;
  width: 300px;
}
.search-wrap input {
  border: 0px;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  padding: 10px 10px 10px 20px;
  margin: 0 !important;
  width: 100%;
  outline: 0;
  background-color: #f9fafc;
  font-size: 14px;
  color: #646d82;
}
.search-wrap select {
  outline: 0;
  border: 0px;
  background-color: #f0f2f7;
  font-size: 14px;
  color: #646d82;
  margin-right: 10px;
}
.search-wrap select > option {
  font-size: 16px;
  color: #646d82;
  background: #f8f8f8;
  line-height: 2;
  outline: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.table-wrap {
  width: 100%;
  background: #fff;
  font-size: 16px;

  .pre-table {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .table-titles {
      .table-title {
        font-size: 30px;
        font-weight: bold;
        color: #646d82;
      }
    }
    .table-ctas {
      display: flex;
    }
  }
  .tr {
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-columns: 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: column;
    border-radius: 2px;
    padding: 3px 10px;
  }
  .tbody {
    background: rgba(0, 110, 255, 0.02);
    border: 1px solid rgba(0, 110, 255, 0.1);
  }
  .th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    font-weight: normal;
    padding: 10px 15px;
    box-sizing: border-box;
    color: #646d82;
    grid-column: span 10;
    border-radius: 7px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &:hover {
      background-color: #f9fafc;
      border-bottom: 2px solid rgba(0, 110, 255, 0.1);
    }
  }

  .td {
    display: flex;
    align-items: center;
    vertical-align: center;
    text-align: left;
    min-height: 35px;
    color: #040e28;
    padding: 2px 15px;
    box-sizing: border-box;
    font-size: 13px;
    grid-column: span 10;
  }
}
.td-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column: span 1;
}
.td-actions svg {
  cursor: pointer;
}
.table-subtitle {
  font-size: 14px;
  color: #a6b1c2;
  font-style: italic;
}
.tbl-controls {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 5px 0;
}
.td-edit-input {
  padding: 8px;
  outline: 0px;
  border: 1px solid rgb(238, 238, 238);
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.02);
  top: 0;
  left: 0;
}

@media only screen and (max-width: 650px) {
  .table-wrap {
    .pre-table {
      flex-flow: column;
      align-items: center;
      .table-ctas {
        margin: 20px 0;
      }
    }
  }
  .tbl-controls {
    flex-flow: column;
    align-items: center;
    .tbl-pagination {
      margin: 20px 0;
    }
  }
  .thead {
    display: none !important;
  }
  .table-wrap .tr {
    display: block;
    -webkit-box-shadow: 0 4px 8px rgba(148, 148, 148, 0.25);
    -moz-box-shadow: 0 4px 8px rgba(148, 148, 148, 0.25);
    box-shadow: 0 4px 8px rgba(148, 148, 148, 0.25);
  }
  .table-wrap .pre-table {
    background: #f9fafc;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
