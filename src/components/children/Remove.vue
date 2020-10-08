<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Usuwanie dziecka</h1>

    <h4 class="center-align mt-5">Czy na pewno chcesz usunąć</h4>
    <h4 class="center-align mb-5"><i>"{{ child.name }}"</i></h4>
    <button ref="deleteChild" class="btn waves-effect waves-light orange darken-2 right" v-on:click="deleteChild">
      Usuń dziecko <i class="material-icons right">delete</i>
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';

  export default {
    name: 'removeChild',
    props: ['id'],
    data: function () {
      return {
          child:{
              name: 'Dziecko testowe',
              id : this.id
          },
          errors:[]
      }
    },
    methods: {
      deleteChild: function () {
        console.log(this.child.id);
        axios.delete(constants.API + 'childs/destroy',         {
          "id": this.child.id,
          "institution_id": "0c2e3660-31c7-11e8-9832-615834c725c6"
        },{
          headers : {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        })
          .then(response => {})
          .catch(e => {
            this.errors.push(e)
          })
      },
    },
    mounted: function () {
      window.Materialize.AutoInit(document.body);
    }
  }
</script>
