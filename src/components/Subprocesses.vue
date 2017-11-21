<template>
  <div class="process-container">
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser">
      <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
        <md-dialog-title>Add subprocess</md-dialog-title>
        <md-dialog-content>
          <md-autocomplete v-model="selectedProcess" :md-options="processes">
            <label>Process</label>
          </md-autocomplete>
          <!--<md-field>-->
          <!--  <label for="movie">Process</label>-->
          <!--  <md-select v-model="selectedProcess" name="process" id="process">-->
          <!--    <md-option v-for="process in notUsedprocesses" :value="process.title">{{ process.title }}</md-option>-->
          <!--  </md-select>-->
          <!--</md-field>-->
          <md-autocomplete  v-model="selectedProcess">
            <label>Process</label>
          </md-autocomplete>
          <md-field>
            <label>Ref</label>
            <md-input v-model="ref"></md-input>
          </md-field>
      
          <md-field>
            <label>Title</label>
            <md-input v-model="title"></md-input>
          </md-field>
      
          <md-field>
            <label>Description</label>
            <md-textarea v-model="description"></md-textarea>
          </md-field>
        </md-dialog-content>
  
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </form>
      
    <md-table v-model="subprocesses" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Subprocesses</h1>
      </md-table-toolbar>


      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Process">{{ item.process }}</md-table-cell>
        <md-table-cell md-label="Ref">{{ item.ref }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="" style="text-align: right;">
          <md-button class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button> 
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-button class="md-fab md-primary md-fab-bottom-right" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
    
  </div>
</template>

<script>
  export default {
    name: 'Subprocesses',
    data: () => ({
      selected: [],
      processes: [
        'A. Administratie',
        'B. Rapportage',
        'C. IT Controls'
      ],
      selectedProcess: null,
      showDialog: false,
      ref: null,
      title: null,
      description: null
    }),
    methods: {
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 'es'
        }

        return `${count} subprocess${plural} selected`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
  .process-container {
    padding-bottom: 100px;
  }
  .md-dialog {
    max-width: 768px;
    width:400px;
  }
</style>