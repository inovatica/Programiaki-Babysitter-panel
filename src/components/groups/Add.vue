<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">Dodawanie grupy</h1>
    <form class="mt-3">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Nazwa grupy" id="first_name" type="text" class="validate" ref="groupName" >
          <label for="first_name" class="active">Nazwa grupy</label>
        </div>
        <div class="input-field col s6">
          <select ref="selectedInstitution">
            <option  v-for="institution in institutions" v-bind:value="institution.id">{{institution.name}}</option>
          </select>
          <label>Instytucja</label>
        </div>
      </div>
      <div class="row">
        <button ref="submitGroup" class="btn waves-effect waves-light orange darken-2 right" v-on:click="submitNewGroup">
          Dodaj grupę <i class="material-icons right">group_add</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';
  export default {
    name: 'addGroup',
    data: function () {
      return {
        postBody:{
          groupName: "",
          selectedInstitution: ""
        },
        errors:[],
        institutions: [{
          "id": "1c8d2a30-492d-11e8-9207-afc4e561b41f",
          "name": "Przed 555",
          "city": "Łódź",
          "zip_code": "99-999",
          "street": "Łódzka",
          "street_number": "12",
          "phone": "699699699",
          "created_at": "2018-04-26 08:37:53",
          "updated_at": "2018-04-26 08:37:53",
          "deleted_at": null,
          "user_id": "1c5f9e00-492d-11e8-909b-83914c57d2ef"
        }, {
          "id": "1c8d2a30-492d-11e8-9207-afc4e561b41f",
          "name": "Przed 656565",
          "city": "Łódź",
          "zip_code": "99-999",
          "street": "Łódzka",
          "street_number": "12",
          "phone": "699699699",
          "created_at": "2018-04-26 08:37:53",
          "updated_at": "2018-04-26 08:37:53",
          "deleted_at": null,
          "user_id": "1c5f9e00-492d-11e8-909b-83914c57d2ef"
        }]
      }
    },
    methods: {
      submitNewGroup: function () {
        this.postBody = {
          "name" : this.$refs.groupName.value,
          "institution_id" : this.$refs.selectedInstitution.value

        };
        axios.post(constants.API + 'groups/create', this.postBody, {
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
      axios.get(constants.API + 'institutions', {
        headers : {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
        .then(response => {
          this.institutions = response.data.data.institutions;
          console.log(this.institutions);
        })
        .catch(e => {
          this.errors.push(e);
          alert("nie udało się dodać grupy");
        });

      window.Materialize.AutoInit(document.body);
    }
  }
</script>
