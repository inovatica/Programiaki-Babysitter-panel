import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery';  // materialize requires jquery for most functionality
import jQuery from 'jquery';
import Materialize from 'materialize-css';
import lockScreenMixin from './components/mixins/lockScreenMinxin';
import userDataMixin from './components/mixins/userDataMixin';
import VueNativeSock from 'vue-native-websocket';
import Vuex from 'vuex';
import Ws_message from './components/messages/WsMessage';


window.$ = $;
window.jQuery = jQuery;
window.Materialize = Materialize;

Vue.config.productionTip = false;

Vue.mixin(lockScreenMixin);
Vue.mixin(userDataMixin);

Vue.use(VueNativeSock,'ws://172.16.0.2:8886',{
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 20, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
});
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogged: false,
    user: {}
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLogged = status;
    },
    setUser(state, user) {
      state.user = user;
    }
  }
});

/* eslint-disable no-new */
Vue.mixin({
  methods: {
    buildInstances: function (_vueInstance) {
      if (this.$data.message === undefined) {
        this.$data.message = new Ws_message(this.$options.sockets, _vueInstance);
      } else {
        console.error("Message instance already exists.");
        return false;
      }
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created() {
    this.buildInstances(this);
  }
});

window.Materialize.AutoInit(document.body);
