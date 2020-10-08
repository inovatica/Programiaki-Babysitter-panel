<template>
  <nav class="col s12 topNav row teal lighten-2">
    <div class="right">
      <button ref="listVideo" class="btn waves-effect waves-light deep-purple darken-4" v-on:click="listVideo">
        Video <i class="material-icons right">ondemand_video</i>
      </button>
      <button ref="unlockTable" class="btn waves-effect waves-light green darken-2 hidden" v-on:click="unlockTable">
        Odblokuj stolik <i class="material-icons right">desktop_windows</i>
      </button>
      <button ref="lockTable" class="btn waves-effect waves-light orange darken-2" v-on:click="lockTable">
        Zablokuj stolik <i class="material-icons right">exit_to_app</i>
      </button>
      <button ref="lockScreen" class="btn waves-effect waves-light orange " v-on:click="lockScreen">
        Zablokuj panel <i class="material-icons right">eject</i>
      </button>
      <button ref="logout" class="btn waves-effect waves-light red accent-4" v-on:click="logout">
        Wyloguj się <i class="material-icons right">power_settings_new</i>
      </button>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../../constants';

  export default{
    methods: {
      lockScreen: function () {
        document.getElementById('lockScreen').classList.add('active');
        this.$socket.send(JSON.stringify({name: 'can_play'}));
      },
      lockTable: function () {
        // here code to send to table
        this.$socket.send(JSON.stringify({name: 'screen_lock'}));
        setTimeout(() => {
          this.$refs.lockTable.classList.add('hidden');
          this.$refs.unlockTable.classList.remove('hidden');
        }, 500)
      },
      unlockTable: function () {
        // here code to send to table
        this.$socket.send(JSON.stringify({name: 'screen_unlock'}));
        setTimeout(() => {
          this.$refs.unlockTable.classList.add('hidden');
          this.$refs.lockTable.classList.remove('hidden');
        }, 500)
      },
      listVideo: function () {
        this.$router.push({name: 'videoList'});
      },
      logout: function () {
        axios.post(constants.API + 'auth/logout', null, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(() => {
          localStorage.removeItem('token');
          this.$store.commit('setUser', {});
          this.$store.commit('setLoginStatus', false);
          this.$socket.send(JSON.stringify({name: 'can_play'}));
        });
      }
    }
  }
</script>
