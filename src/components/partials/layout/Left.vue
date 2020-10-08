<template>
  <nav ref="nav" class="col s12 leftNav row p-0 m-0 z-depth-3">
    <div ref="menuContent" class="col s10 row">
      <div class="col s12 mt-1">
        <button ref="unlockTable" class="btn waves-effect waves-light orange darken-2 right" v-on:click="addNewGroup">
          Dodaj grupę <i class="material-icons right">group_add</i>
        </button>
      </div>
      <div class="col s12">
        <table class="striped responsive-table">
          <thead>
          <tr>
            <th>Nazwa grupy</th>
            <th>Ilość dzieci</th>
            <th>Dzieci</th>
            <th>Czy Aktywna</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody v-if="groups && groups.length">
                    <tr v-for="group of groups">
                      <td>{{group.name}}</td>
                      <td>12</td>
                      <td>
                        <button ref="showChildren" class="btn waves-effect waves-light orange darken-2 left" v-on:click="showChildren(group.id, group.name)">
                        Pokaż grupę <i class="material-icons right">group</i>
                      </button>
                      </td>
                      <td>
                        <span>Tak</span>
                      </td>
                      <td>
                        <i class="material-icons left" v-on:click="editGroup(group.id, group.name)">edit</i>
                        <i class="material-icons left" v-on:click="removeGroup(group.id, group.name)">delete</i>
                      </td>
                    </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div ref="panel" class="col s1 offset-s1 row">
      <div class="col s10 offset-s2">
        <div class="leftNav__user">
          <router-link :to="{name:'Homepage'}">
            <img :src="user.domain + this.$store.state.user.image" alt="avatar" class="circle green darken-1 mt-1 avatar">
          </router-link>
          <p class="center-align flat leftNav__name">{{this.$store.state.user.name}}</p>
        </div>
        <div class="center-align leftNav__more">
          <span v-on:click="toggle" class="leftNav__more-aquo">&raquo;</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../../constants';

  export default{
    data() {
      return {
        posts: [],
        errors: [],
        groups: [],
      }
    },
    methods: {
      toggle: function () {
        if (this.$refs.nav.classList.contains('active')) {
          this.$refs.nav.classList.remove('active')
        } else {
          this.$refs.nav.classList.add('active')
        }
      },
      addNewGroup: function () {
        this.$router.push({name: 'addGroup'});
        this.$refs.nav.classList.remove('active')
      },
      editGroup: function (id, name) {
        this.$router.push({name: 'editGroup', params: {id: id, name:name}});
        this.$refs.nav.classList.remove('active')
      },
      removeGroup: function (id, name) {
        this.$router.push({name: 'removeGroup', params: {id: id, name:name}});
        this.$refs.nav.classList.remove('active')
      },
      showChildren: function (id, name) {
        this.$router.push({name: 'showGroup', params: {id: id, name:name}});
        this.$refs.nav.classList.remove('active')
      }
    },
    mounted: function () {
      axios.get(constants.API +'groups',
        {
          headers :{
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
        })
        .then(response => {
          this.groups = response.data.data.groups[0];
          console.log(this.groups);
        })
        .catch(e => {
          this.errors.push(e)
        });

      window.Materialize.AutoInit(document.body);

    }
  }
</script>

<style scoped>
  .material-icons {
    cursor: pointer;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
</style>
