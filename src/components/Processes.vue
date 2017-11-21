<template>
  <div class="process-container">
  <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser">
      <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
        <md-dialog-title>Add process</md-dialog-title>
        <md-dialog-content>
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
        </md-dialog-content>
  
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="createProcess()">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </form>
      
    <md-table v-model="allProcesses" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Processes</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Ref">{{ item.ref }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="" style="text-align: right;">
          <md-button class="md-icon-button" @click="deleteProcess(item.id)">
            <md-icon>delete</md-icon>
          </md-button>  
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="idToDelete"
      md-title="Delete process?"
      md-content="Are you sure you want to delete this process."
      md-confirm-text="DELETE"
      md-cancel-text="CANCEL"
      @md-cancel="idToDelete = null"
      @md-confirm="deleteProcess" />

    <md-button class="md-fab md-primary md-fab-bottom-right md-fixed" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
    
  </div>
</template>

<script>
  import {
    ALL_PROCESSES_QUERY,
    CREATE_PROCESS_MUTATION,
    DELETE_PROCESS_MUTATION
  } from '../constants/graphql'

  export default {
    name: 'Processes',
    data: () => ({
      allProcesses: [],
      showDialog: false,
      ref: null,
      title: null,
      description: null,
      idToDelete: null
    }),
    apollo: {
      allProcesses: {
        query: ALL_PROCESSES_QUERY
      }
    },
    methods: {
      createProcess () {
        const { ref, title, description } = this.$data
        this.$apollo.mutate({
          mutation: CREATE_PROCESS_MUTATION,
          variables: {
            ref,
            title,
            description
          },
          update: (store, { data: { createProcess } }) => {
            const data = store.readQuery({
              query: ALL_PROCESSES_QUERY
            })
            data.allProcesses.push(createProcess)
            store.writeQuery({ query: ALL_PROCESSES_QUERY, data })
          }
        })
        this.ref = null
        this.title = null
        this.description = null
        this.showDialog = false
      },
      deleteProcess (id = null) {
        const { idToDelete } = this.$data
        console.log(idToDelete)
        if (idToDelete) {
          this.$apollo.mutate({
            mutation: DELETE_PROCESS_MUTATION,
            variables: {
              id: idToDelete
            },
            refetchQueries: [{
              query: ALL_PROCESSES_QUERY
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

        return `${count} process${plural} selected`
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
