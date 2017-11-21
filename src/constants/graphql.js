import gql from 'graphql-tag'

export const ALL_PROCESSES_QUERY = gql`
  query AllProcessesQuery {
    allProcesses {
      id
      ref
      title
      description
    }
  }
`

export const CREATE_PROCESS_MUTATION = gql`
  mutation CreateProcessMutation($ref: String, $title: String!, $description: String) {
    createProcess(
      ref: $ref
      title: $title
      description: $description
    ) {
      id
      createdAt
      ref
      title
      description
    }
  }
`

export const DELETE_PROCESS_MUTATION = gql`
  mutation DeleteProcessMutation($id: ID!) {
    deleteProcess(
      id: $id
    ) {
      id
      ref
      title
      description
    }
  }
`
