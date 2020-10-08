<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Usuwanie dziecka z grupy {{this.groupName}} </h1>

    <h4 class="center-align mt-5">Czy na pewno chcesz usunąć</h4>
    <h4 class="center-align mb-5"><i>"{{ this.childName }}"</i></h4>
    <button ref="deleteChild" class="btn waves-effect waves-light orange darken-2 right" v-on:click="deleteChild">
      Usuń dziecko <i class="material-icons right">delete</i>
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';

  export default {
    name: 'removeChildFromGroup',
    props: ['groupId', 'childId', 'childName', 'groupName'],
    data: function () {
      return {
          child:{
              name: this.childName,
              id : this.id
          },
          errors:[]
      }
    },
    methods: {
      deleteChild: function () {
        let postbody = {
          "group_id": this.group_id,
          "childs": this.childId
        };
        console.log("delete child");
        axios.delete(constants.API + 'groups/childs/remove', postbody, {
          headers : {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        })
          .then(response => {
          })
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
