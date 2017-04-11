import React from 'react';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Divider, RaisedButton,
     Dialog, FlatButton, Table,
      TableHeader,TableRow, TableBody,
      TableHeaderColumn
    } from 'material-ui';
import {FaPlusCircle} from 'react-icons/lib/fa';
import {setIsCreated, setAddNewTask, setDeleteTask, setEditTask, setUpdateTask, createNewTaskFromEventID, getTaskFromEventID} from '../../reducer/tasks/action';
import ButtonRefresh from '../Utility/ButtonRefresh';

import CreateForm from './DashPageTasks/CreateForm';

const CreateEventTask = ({event_id}) => ({

    getContentPage() {

        const data = store.getState().tasks.data;
        const isCreated = store.getState().tasks.isCreated;
        const task = store.getState().tasks.task;

        if (isCreated) {
            return (<div> 
                <CreateForm></CreateForm>
                <Divider></Divider>
                <div style={{
                    ...styles.divHorizontal,
                    'float': 'right'
                }}>
                    <RaisedButton
                        label="Tạo"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.handleCloseCreate}
                    />
                    <FlatButton
                    label="Trở lại"
                    primary={true}
                    onTouchTap={this.handleCloseCreate}
                    />,
                </div>
            </div>)
        }

        const tableStyle = styles.taskListTable.table;
        const tableHeaderStyle = styles.taskListTable.tableHeader;
        const tableBodyStyle = styles.taskListTable.tableBody;
        return (
            <div>
                <div className="event-task-header">
                    <RaisedButton 
                        label="Thêm nhiệm vụ"
                        primary={true}
                        icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        onTouchTap={() => {
                            store.dispatch(createNewTaskFromEventID(event_id));
                        }}
                    />
                    <ButtonRefresh onTouchTap={() => {
                        
                    }}/>
                </div>
                <Divider style={{
                    marginTop: 10,
                    marginBottom: 10
                }}/>
                <div className="event-task-list">
                    <Table 
                        fixedHeader={tableStyle.fixedHeader}
                        fixedFooter={tableStyle.fixedFooter}
                        selectable={tableStyle.selectable}
                        multiSelectable={tableStyle.multiSelectable}
                    >
                        <TableHeader
                            displaySelectAll={tableHeaderStyle.showCheckboxes}
                            adjustForCheckbox={tableHeaderStyle.showCheckboxes}
                            enableSelectAll={tableHeaderStyle.enableSelectAll}
                        >
                            <TableRow>
                                <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                                    Danh sách nhiệm vụ của sự kiện
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={tableBodyStyle.showCheckboxes}
                            deselectOnClickaway={tableBodyStyle.deselectOnClickaway}
                            showRowHover={tableBodyStyle.showRowHover}
                            stripedRows={tableBodyStyle.stripedRows}
                        >
                            {/*{tableData.map( (row, index) => (
                                <TableRow
                                 key={index}
                                 selected={row.selected}
                                 onTouchTap={() => {

                                 }}
                                 >
                                    <TableRowColumn>{index}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.status}</TableRowColumn>
                                </TableRow>
                            ))}*/}
                        </TableBody>

                    </Table>
                </div>
            </div>
        );
    },

    render() {
        const content = this.getContentPage();
        return (
            content   
        )
    },
    
    handleCloseCreate() {
        store.dispatch(setIsCreated(false));
    },

    componentWillMount() {
        console.log("Called");
        store.dispatch(getTaskFromEventID(event_id));
    }

});

const mapStateToProps = ({tasks}) => ({
    tasks
});

export default connect(mapStateToProps)(CreateEventTask);

{/*<Dialog
                    title="Tạo nhiệm vụ"
                    actions={[
                        ,
                    ]}
                    modal={false}
                    open={isCreated}
                    onTouchTap={this.handleCloseCreate}
                    autoScrollBodyContent={true}
                    >
                    <CreateForm></CreateForm>
                </Dialog>*/}