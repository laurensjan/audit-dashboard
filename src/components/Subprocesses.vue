<template>
  <div class="subprocess-container">
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser">
      <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
        <md-dialog-title>Add subprocess</md-dialog-title>
        <md-dialog-content>
          <md-field>
            <label for="process">Process</label>
            <md-select v-model="process" name="process" id="process" required>
              <md-option v-for="process in allProcesses" :key="process.id" :value="process.id">{{ process.ref }} {{ process.title }}</md-option>
            </md-select>
          </md-field>
            
          <md-field>
            <label>Ref</label>
            <md-input v-model="ref"></md-input>
          </md-field>
      
          <md-field>
            <label>Title</label>
            <md-input v-model="title" required></md-input>
          </md-field>
      
          <md-field>
            <label>Description</label>
            <md-textarea v-model="description"></md-textarea>
          </md-field>
          
          <md-field>
            <label>Control objective</label>
            <md-textarea v-model="controlObjective"></md-textarea>
          </md-field>
        </md-dialog-content>
  
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="createSubprocess()">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </form>
      
    <md-table v-model="allSubprocesses" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Subprocesses</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Ref">{{ item.ref }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.title | truncate(30) }}</md-table-cell>
        <md-table-cell md-label="Description">{{ item.description | truncate(50) }}</md-table-cell>
        <md-table-cell md-label="Control objective">{{ item.controlObjective | truncate(50) }}</md-table-cell>
        <md-table-cell md-label="" style="text-align: right;">
          <md-button class="md-icon-button" @click="deleteSubprocess(item.id)">
            <md-icon>delete</md-icon>
          </md-button>  
        </md-table-cell>
      </md-table-row>
    </md-table>
    
    <md-dialog-confirm
      :md-active.sync="idToDelete"
      md-title="Delete subprocess?"
      md-content="Are you sure you want to delete this subprocess."
      md-confirm-text="DELETE"
      md-cancel-text="CANCEL"
      @md-cancel="idToDelete = null"
      @md-confirm="deleteSubprocess" />

    <md-button class="md-fab md-primary md-fab-bottom-right" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
    
  </div>
</template>

<script>
  import {
    ALL_PROCESSES_QUERY,
    ALL_SUBPROCESSES_QUERY,
    CREATE_SUBPROCESS_MUTATION,
    DELETE_SUBPROCESS_MUTATION
  } from '../constants/graphql'

  export default {
    name: 'Subprocesses',
    data: () => ({
      allProcesses: [],
      allSubprocesses: [],
      showDialog: false,
      process: null,
      ref: null,
      title: null,
      description: null,
      controlObjective: null,
      idToDelete: null
    }),
    apollo: {
      allProcesses: {
        query: ALL_PROCESSES_QUERY
      },
      allSubprocesses: {
        query: ALL_SUBPROCESSES_QUERY
      }
    },
    methods: {
      createSubprocess () {
        const { process, ref, title, description, controlObjective } = this.$data
        this.$apollo.mutate({
          mutation: CREATE_SUBPROCESS_MUTATION,
          variables: {
            process,
            ref,
            title,
            description,
            controlObjective
          },
          update: (store, { data: { createSubprocess } }) => {
            const data = store.readQuery({
              query: ALL_SUBPROCESSES_QUERY
            })
            data.allSubprocesses.push(createSubprocess)
            store.writeQuery({ query: ALL_SUBPROCESSES_QUERY, data })
          }
        })
        this.ref = null
        this.title = null
        this.description = null
        this.showDialog = false
      },
      deleteSubprocess (id = null) {
        const { idToDelete } = this.$data
        console.log(idToDelete)
        if (idToDelete) {
          this.$apollo.mutate({
            mutation: DELETE_SUBPROCESS_MUTATION,
            variables: {
              id: idToDelete
            },
            refetchQueries: [{
              query: ALL_SUBPROCESSES_QUERY
            }]
          })
          this.deleteConfirmed = false
        }
        this.idToDelete = id
      },
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
  .subprocess-container {
    padding-bottom: 100px;
  }
  .md-dialog {
    max-width: 768px;
    width:400px;
    z-index: 50;
  }
</style>
