import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Processes from '@/components/Processes'
import Subprocesses from '@/components/Subprocesses'
import Controls from '@/components/Controls'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/processes',
      name: 'Processes',
      component: Processes
    },
    {
      path: '/subprocesses',
      name: 'Subprocesses',
      component: Subprocesses
    },
    {
      path: '/controls',
      name: 'Controls',
      component: Controls
    }
  ]
})
