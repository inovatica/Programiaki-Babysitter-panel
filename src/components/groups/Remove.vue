<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Usuwanie grupy</h1>

    <h4 class="center-align mt-5">Czy na pewno chcesz usunąć</h4>
    <h4 class="center-align mb-5"><i>"{{ group.name }}"</i></h4>
    <button ref="deleteGroup" class="btn waves-effect waves-light orange darken-2 right" v-on:click="deleteGroup">
      Usuń grupę <i class="material-icons right">delete</i>
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';

  export default {
    name: 'removeGroup',
    props: ['id', 'name'],
    data: function () {
      return {
          group:{
              name: this.name,
              id : this.id
          },
          errors:[]
      }
    },
    methods: {
      deleteGroup: function () {
        axios.delete(constants.API + 'groups/destroy',{
          "id": this.group.id
        },{
          headers : {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        })
          .then(response => {})
          .catch(e => {
            this.errors.push(e);
            alert("nie udało się usunąć grupy");

          })
      },
    },
    mounted: function () {
      window.Materialize.AutoInit(document.body);
    }
  }
</script>
