<template>
  <div class="col s12 m10 offset-m1">
    <h1 class="header red-text">{{this.name}}</h1>
    <button ref="" class="btn waves-effect waves-light orange darken-2 right" v-on:click="">
      Dodaj dziecko do grupy <i class="material-icons right">group_add</i>
    </button>
    <form class="mt-3">

      <div class="row">
        <div class="col s12">
          <table class="striped responsive-table">
            <thead>
            <tr>
              <th>Imię</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody v-if="children && children.length">
            <tr v-for="child of children">
              <td>{{child.name}}</td>
              <td>
                <i class="material-icons left" v-on:click="editChild(child.id, child.name)">edit</i>
                <i class="material-icons left" v-on:click="deleteChildfromGroup(child.id, child.name)">delete</i>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as constants from '../../constants';
  export default {
    name: 'showGroup',
    props: ['id', 'name'],
    data: function () {
      return {
        group:{
          name: this.name,
          id : this.id
        },
        children: [{"name": "Jaś", "id": "123"},{"name": "Kasia"},{"name": "Asia"},{"name": "Witek"},{"name": "Michał"},{"name": "Grześ"},],

        errors:[]
      }
    },
    methods: {

      editChild: function (childId, childName) {

        let postbody = {
          "group_id": this.id,
          "childs": childId
        };
        console.log("edit child");
        axios.post(constants.API + 'groups/childs/update', postbody, {
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


      deleteChildfromGroup: function (childId, name) {
        this.$router.push({name: 'removeChildFromGroup', params: {groupId:this.id, childId: childId, childName:name, groupName:this.group.name}});
      },

    },
    mounted: function () {
      axios.post(constants.API + 'groups/childs', this.id,{
        headers : {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(this.children);
          this.children = response.data.data.childs;
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

</style>
