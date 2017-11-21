<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Dashboard v2</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <!--<md-divider v-if="menuVisible"></md-divider>-->
          <md-subheader v-if="menuVisible">Client portal</md-subheader>

          <md-list-item to="/">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>
          
          <md-list-item to="/processes">
            <md-avatar class="md-avatar-icon md-small menu-avatar">P</md-avatar>
            <span class="md-list-item-text">Processes</span>
          </md-list-item>

          <md-list-item to="/subprocesses">
            <md-avatar class="md-avatar-icon md-small menu-avatar">SP</md-avatar>
            <span class="md-list-item-text">Subprocesses</span>
          </md-list-item>

          <md-list-item to="/controls">
            <md-avatar class="md-avatar-icon md-small menu-avatar">C</md-avatar>
            <span class="md-list-item-text">Controls</span>
          </md-list-item>
          
          <md-divider></md-divider>
          <md-subheader v-if="menuVisible">Team portal</md-subheader>
          
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
        
        <div style="text-align:center;margin:20px auto;">
          <img src="https://www.graph.cool/static/media/badge.10d1f6dd.svg">
        </div>

      </md-app-content>
    </md-app>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine"; // Import the theme engine
  
  @include md-register-theme("default", (
    primary: md-get-palette-color(bluegrey, A200), // The primary color of your application
    accent: md-get-palette-color(amber, A200), // The accent and secondary color
    /*theme: dark*/
  ));
  
  @import "~vue-material/dist/theme/all"; // Apply the theme
</style>

<style lang="scss" scoped>
  .menu-avatar {
    background-color: rgba(0, 0, 0, 0.54)!important;
    /*background-color: white!important;*/
    margin-right: 32px!important;
  }
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }
  .md-list-item-text {
    text-transform: none!important;
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
