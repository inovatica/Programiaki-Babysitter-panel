<template>
  <div class="screen-login lockScreen" v-bind:class="{ 'hideLoginPanel': this.$store.state.isLogged }">
    <form class="lockScreen__block row" v-on:submit.prevent="login">
      <div class="col s12">
        <p class="center-align mb-0">Programiaki</p>
      </div>
      <div class="col s12 center-align">
        <div class="input-field">
          <input ref="login" id="login" type="text">
          <label for="login">Login</label>
        </div>
        <div class="input-field">
          <input ref="pass" id="pass" type="password">
          <label for="pass">Hasło</label>
        </div>
        <button class="btn waves-effect waves-light green darken-2">
          Zaloguj się
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../../constants';

  export default {
    name: 'ScreenLogin',
    methods: {
      login: function () {
        const data = {
          email: this.$refs.login.value,
          password: this.$refs.pass.value
        };
        axios.post(constants.API + 'auth/login', data, {
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(data => {
          localStorage.setItem('token', data.data.data.token);
          this.$store.commit('setUser', data.data.data.user);
          this.$store.commit('setLoginStatus', true);
          this.$refs.login.value = '';
          this.$refs.pass.value = '';
          this.$socket.send(JSON.stringify({name: 'cant_play'}));
        })
        .catch(() => {
          this.$refs.login.classList.add('invalid');
          this.$refs.pass.classList.add('invalid');
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .lockScreen {
    position: absolute;
    z-index: 200;
    width: 100vw;
    height: 100vh;
    top: 0;
    transition: all .7s;
    background: #009687;

    &.hideLoginPanel {
      top: -100vh;
    }

    &__block {
      background-color: #fff;
      padding: 0 3rem;
      position: absolute;
      top: 50%;
      left: 50%;
      height: 300px;
      width: 300px;
      margin-top: -150px;
      margin-left: -150px;

    }
  }
</style>
