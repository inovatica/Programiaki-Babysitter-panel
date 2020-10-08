import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/Homepage'
import addGroup from '../components/groups/Add'
import editGroup from '../components/groups/Edit'
import removeGroup from '../components/groups/Remove'
import addChild from '../components/children/Add'
import editChild from '../components/children/Edit'
import removeChild from '../components/children/Remove'
import removeChildFromGroup from '../components/childrenInGroup/Remove'
import showGroup from '../components/groups/Show'
import videoList from '../components/videos/List'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/groups/add',
      name: 'addGroup',
      component: addGroup
    },
    {
      path: '/groups/edit/:id',
      name: 'editGroup',
      component: editGroup,
      props: true
    },
    {
      path: '/groups/remove/:id',
      name: 'removeGroup',
      component: removeGroup,
      props: true
    },
    {
      path: '/child/add',
      name: 'addChild',
      component: addChild
    },
    {
      path: '/child/edit/:id',
      name: 'editChild',
      component: editChild,
      props: true
    },
    {
      path: '/child/remove/:id',
      name: 'removeChild',
      component: removeChild,
      props: true
    },
    {
      path: '/groups/show/:id',
      name: 'showGroup',
      component: showGroup,
      props: true
    },
    {
      path: '/groups/deleteChildInGroup/:id',
      name: 'removeChildFromGroup',
      component: removeChildFromGroup,
      props: true
    },
    {
      path: '/videos',
      name: 'videoList',
      component: videoList,
      props: true
    },

  ]
})
