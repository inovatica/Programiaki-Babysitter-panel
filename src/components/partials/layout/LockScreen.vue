<template>
  <div ref="lockScreen" id="lockScreen" class="teal lockScreen">
    <form class="lockScreen__block row" v-on:submit.prevent="unlockTable">
      <div class="col s12">
        <p class="center-align mb-0">{{ this.$store.state.user.name }}</p>
      </div>
      <div class="col s6 offset-s3 center-align lockScreen__block-avatar">
        <img :src="user.domain + this.$store.state.user.image" alt="avatar" class="circle responsive-img red lighten-2 mt-1 avatar">
      </div>
      <div class="col s12 center-align">
        <div class="input-field">
          <input ref="password" id="password" type="password">
          <label for="password">Hasło</label>
        </div>
        <button class="btn waves-effect waves-light green darken-2">
          Odblokuj
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  import axios from 'axios';
  import * as constants from '../../../constants';

  export default{
    methods: {
      unlockTable: function () {
        const data = {
          email: this.$store.state.user.email,
          password: this.$refs.password.value
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
            this.$refs.password.value = '';
            this.$refs.password.classList.remove('invalid');
            this.$refs.lockScreen.classList.remove('active');
            this.$socket.send(JSON.stringify({name: 'cant_play'}));
          })
          .catch(() => {
            this.$refs.password.classList.add('invalid');
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
    top: -100vh;
    transition: all .7s;

    &.active {
      top: 0vh;
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
  .avatar {
    width: 80px;
    height: 80px;
  }
</style>
