<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Dodawanie dziecka</h1>
    <form class="mt-3">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Imię" id="first_name" type="text" class="validate" ref="childName" >
          <label for="first_name" class="active">First Name</label>
        </div>
        <div class="input-field col s6">
          <select ref="selectedGroup">
            <option value="" disabled selected>Wybierz grupę</option>
            <option value="1">kotek</option>
            <option value="2">kwiatek</option>
          </select>
          <label>Grupa</label>
        </div>
      </div>
      <div class="row">
        <button ref="submitChild" class="btn waves-effect waves-light orange darken-2 right" v-on:click="submitNewChild">
          Dodaj dziecko <i class="material-icons right">group_add</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'addChild',
    data: function () {
      return {
        postBody:{
          childName: "",
          selectedGroup: ""
        },
        errors:[]
      }
    },
    methods: {
      submitNewChild: function () {
        this.postBody = {
          name : this.$refs.childName.value,
          groups: this.$refs.selectedGroup.value,
          //TODO get inst ID
          institution_id: this.$refs.selectedGroup.value
        };

        console.log(this.postBody);
        axios.post(`http://backend.loc/api/childs/create`, this.postBody, {
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
