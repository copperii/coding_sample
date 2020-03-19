import gql from 'graphql-tag'

export const GET_DRAW_SET_NAMES = gql`
  query GetDrawSetNames(
    $search: String
    $startfrom: Int
    $maxitems: Int
    $public: Boolean
  ) {
    drawSets(
      search: $search
      startfrom: $startfrom
      maxitems: $maxitems
      public: $public
    ) {
      id
      name
      public
      owner {
        id
        username
      }
    }
  }
`

export const GET_DRAW_SETS = gql`
  query GetDrawSets(
    $id: String
    $search: String
    $startfrom: Int
    $maxitems: Int
    $public: Boolean
  ) {
    drawSets(
      id: $id
      search: $search
      startfrom: $startfrom
      maxitems: $maxitems
      public: $public
    ) {
      id
      name
      description
      creationDate
      public
      coordinates {
        id
        coordinateText
        coordinate
        latitude
        longitude
        lastUpdate
        draw
        edit
        lengthInMeters
        direction
        startPointName
        endPointName
        notes
        endLatitude
        endLongitude
        id
        createdBy {
          username
        }
      }
    }
  }
`
export const GET_DRAW_SET = gql`
  query GetDrawSet($id: String!) {
    drawSets(id: $id) {
      id
      name
      description
      creationDate
      public
      coordinates {
        id
        coordinateText
        coordinate
        latitude
        longitude
        lastUpdate
        draw
        edit
        lengthInMeters
        direction
        startPointName
        endPointName
        notes
        endLatitude
        endLongitude
        id
        createdBy {
          username
        }
      }
    }
  }
`
export const CREATE_DRAW_SET = gql`
  mutation createDrawSet(
    $name: String!
    $description: String
    $public: Boolean
  ) {
    createDrawSet(name: $name, description: $description, public: $public) {
      drawSet {
        id
        name
        description
        public
        owner {
          username
          id
        }
      }
      ok
    }
  }
`

export const CREATE_COORDINATE_DRAW = gql`
  mutation createCoordinateDraw(
    $drawSetId: String!
    $coordinateText: String!
    $coordinate: String
    $latitude: Float
    $longitude: Float
    $draw: Boolean
    $edit: Boolean
    $lengthInMeters: Float
    $direction: Float
    $startPointName: String
    $endPointName: String
    $notes: String
    $endLatitude: Float
    $endLongitude: Float
  ) {
    createCoordinateDraw(
      drawSetId: $drawSetId
      coordinateText: $coordinateText
      coordinate: $coordinate
      latitude: $latitude
      longitude: $longitude
      draw: $draw
      edit: $edit
      lengthInMeters: $lengthInMeters
      direction: $direction
      startPointName: $startPointName
      endPointName: $endPointName
      notes: $notes
      endLatitude: $endLatitude
      endLongitude: $endLongitude
    ) {
      coordinateDraw {
        coordinateText
        coordinate
        latitude
        longitude
        lastUpdate
        draw
        edit
        lengthInMeters
        direction
        startPointName
        endPointName
        notes
        endLatitude
        endLongitude
        id
        drawSet {
          id
          name
        }
        createdBy {
          username
        }
      }
    }
  }
`
export const DELETE_DRAW_SET = gql`
  mutation deleteDrawSet($id: String!) {
    deleteDrawSet(drawSetId: $id) {
      drawSet {
        name
        description
        owner {
          username
          id
        }
      }
      ok
      deletedId
    }
  }
`
export const EDIT_DRAW_SET = gql`
  mutation editDrawSet(
    $id: String!
    $name: String
    $description: String
    $public: Boolean
  ) {
    editDrawSet(
      drawSetId: $id
      name: $name
      description: $description
      public: $public
    ) {
      drawSet {
        id
        name
        description
        public
        owner {
          username
          id
        }
      }
      ok
    }
  }
`

export const EDIT_COORDINATE_DRAW = gql`
  mutation editCoordinateDraw(
    $coordDrawId: String!
    $coordinateText: String!
    $coordinate: String
    $latitude: Float
    $longitude: Float
    $draw: Boolean
    $edit: Boolean
    $lengthInMeters: Float
    $direction: Float
    $startPointName: String
    $endPointName: String
    $notes: String
    $endLatitude: Float
    $endLongitude: Float
  ) {
    editCoordinateDraw(
      coordDrawId: $coordDrawId
      coordinateText: $coordinateText
      coordinate: $coordinate
      latitude: $latitude
      longitude: $longitude
      draw: $draw
      edit: $edit
      lengthInMeters: $lengthInMeters
      direction: $direction
      startPointName: $startPointName
      endPointName: $endPointName
      notes: $notes
      endLatitude: $endLatitude
      endLongitude: $endLongitude
    ) {
      coordinateDraw {
        coordinateText
        coordinate
        latitude
        longitude
        lastUpdate
        draw
        edit
        lengthInMeters
        direction
        startPointName
        endPointName
        notes
        endLatitude
        endLongitude
        id
        drawSet {
          id
          name
        }
        createdBy {
          username
        }
      }
      ok
    }
  }
`

export const DELETE_COORDINATE_DRAW = gql`
  mutation deleteCoordinateDraw($coordDrawId: String!) {
    deleteCoordinateDraw(coordDrawId: $coordDrawId) {
      coordinateDraw {
        coordinateText
        createdBy {
          username
          id
        }
      }
      ok
      deletedId
    }
  }
`
