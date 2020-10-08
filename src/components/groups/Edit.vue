<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Edycja grupy {{this.name}}</h1>
    <form class="mt-3">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Nazwa grupy" id="first_name" type="text" class="validate" ref="groupName">
          <label for="first_name" class="active">Nazwa grupy</label>
        </div>
      </div>
      <div class="row">
        <button ref="editGroup" class="btn waves-effect waves-light orange darken-2 right" v-on:click="editGroup">
          Zapisz grupę <i class="material-icons right">save</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';

  export default {
    name: 'editGroup',
    props: ['id', 'name'],
    data: function () {
      return {
        group: {},
        errors:[],
      }
    },
    methods: {
      editGroup: function () {
        this.group = {
            id : this.id,
            name: this.$refs.groupName.value
        };
        console.log(this.group);
        axios.post(constants.API +'groups/update', this.group,{
          headers : {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        })
          .then(response => {})
          .catch(e => {
            this.errors.push(e);
            alert("nie udało się edytowa grupy");

          })
      },
    },
    mounted: function () {
      window.Materialize.AutoInit(document.body);
    }
  }
</script>
