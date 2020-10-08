<template>
  <div class="col s12 m10 offset-m1">
    <div clas="row">
      <h1 class="col s12 header red-text">Lista Video</h1>
      <div class="col s12">
        <button class="right btn waves-effect waves-light deep-purple darken-4" v-on:click="closeVideo()">
          Zamknij moduł Video <i class="material-icons right">power_settings_new</i>
        </button>
      </div>
      <div class="col s12 mt-1">
        <button class="right btn waves-effect waves-light red darken-4" v-on:click="abortPlaying()">
          Zatrzymaj odtwarzanie <i class="material-icons right">stop</i>
        </button>
      </div>
    </div>
    <div class="col s12">
      <table class="striped responsive-table">
        <thead>
        <tr>
          <th>Nazwa grupy</th>
          <th>Klucz</th>
          <th class="center">Akcje</th>
        </tr>
        </thead>
        <tbody v-if="videos && videos.length">
        <tr v-for="video of videos">
          <td>{{video.name}}</td>
          <td>{{video.key}}</td>
          <td class="center">
            <a class="waves-effect waves-light btn-small" v-on:click="playVideo(video.key)"><i
              class="material-icons right">play_circle_outline</i>button</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';

  export default {
    data: function () {
      return {
        videos: [
          {name: "Królikozaur demo", key: "sample-demo"}
        ]
      }
    },
    methods: {
      playVideo: function (key) {
        this.$socket.send(JSON.stringify({name: 'play_video', key: key}));
      },
      abortPlaying: function () {
        this.$socket.send(JSON.stringify({name: 'stop_play_video'}));
      },
      closeVideo: function () {
        this.$socket.send(JSON.stringify({name: 'close_video'}));
        setTimeout(() => {
          this.$router.push({name: 'Homepage'});
        }, 500)
      },
    }
  }
</script>
<style scoped>
  .material-icons {
    cursor: pointer;
  }
</style>
