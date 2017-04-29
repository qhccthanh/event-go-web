import {orange500, teal500, teal300, blue500,red500 } from 'material-ui/styles/colors';

export default  {
  
  baseColor: teal500,
  warningColor: orange500,
  errorColor: red500,
  baseSubColor: blue500,

  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: teal300,
  },
  floatingLabelFocusStyle: {
    color: teal500,
  },
  topButton: {
      marginRight: 10,
  },
  divHorizontal: {
      position: 'relative',
      display: 'flex'
  },
  stylesChip: {
      chip: {
        margin: 4,
        textColor: 'white'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
  },
  editSupplierTextField: {
    marginRight: 10
  },
  pageStyle: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 50,
    display: 'inherit',
    zDepth: 2,
  },
  headerIconButton: {
    size: 18
  },
  leftIconButton: {
    size: 18
  },
  taskIconButton: {
    size: 25
  },
  staffIconButton: {
    size: 30
  },
  buttonMargin: {
    marginLeft: 4,
    marginRight: 4
  },
  createLocationMap: {
    height: 300,
    marginBottom: 20,
    marginTop: 20,
  },
  taskListTable: {
    table: {
      fixedHeader: true,
      fixedFooter: false,
      selectable: true,
      multiSelectable: false,
    },
    tableHeader: {
      enableSelectAll: false,
      showCheckboxes : true,
    },
    tableBody: {
      deselectOnClickaway: true,
      showRowHover: true,
      stripedRows: true
    },
    tableRow: {
      // textAlign: 'center'
    }
  },
  toggle: {
    marginBottom:5,
    marginTop:5,
    maxWidth: 250,
  }
};