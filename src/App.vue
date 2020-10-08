<template>
  <div id="app" class="row">
    <ScreenLogin/>
    <LockScreen/>
    <left/>
    <main class="col s11 offset-s1 white ip-0">
      <top/>
      <div class="p-1 row">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from './constants';
  import Left from "./components/partials/layout/Left"
  import Top from "./components/partials/layout/Top"
  import LockScreen from "./components/partials/layout/LockScreen"
  import ScreenLogin from "./components/partials/layout/ScreenLogin"

  export default {
    components: {Left, Top, LockScreen, ScreenLogin},
    name: 'App',
    mounted() {
      this.whoAmI();
      this.gameQuestion();
    },
    methods: {
      whoAmI: function () {
        axios.get(constants.API + 'who-am-i', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((data) => {
          this.$store.commit('setUser', data.data.data.user);
          this.$store.commit('setLoginStatus', true);
          this.$socket.send(JSON.stringify({name: 'cant_play'}));
        })
        .catch(() => {
          localStorage.removeItem('token');
          this.$store.commit('setUser', {});
          this.$store.commit('setLoginStatus', false);
        });
      },
      gameQuestion: function () {
        this.$parent.$data.message.bindOnMessage({
          name: 'game_request',
          func: () => {
            console.log("hee!");
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "../node_modules/materialize-css/sass/materialize";
  @import "../node_modules/material-icons/iconfont/material-icons.css";
  @import "assets/scss/style";
</style>
