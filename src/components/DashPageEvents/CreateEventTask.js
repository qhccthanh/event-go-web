import React from 'react';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Divider, RaisedButton, FlatButton,
     Dialog, Table, TableHeader,TableRow, TableBody,IconMenu,
      TableHeaderColumn, TableRowColumn, IconButton, MenuItem
    } from 'material-ui';
import {FaPlusCircle, FaTrash} from 'react-icons/lib/fa';
import {setIsCreated, setAddNewTask,setEditTask, createNewTaskFromEventID, 
      getTaskFromEventID, setDialogCreateTask, deleteTask, createTaskWithLocations} from '../../reducer/tasks/action';

import {setSnackBarMessage} from '../../reducer/dashboard/action';

import ButtonRefresh from '../Utility/ButtonRefresh';

import TaskInfo from './DashPageTasks/TaskInfo';
import TaskCard from './DashPageTasks/TaskCard';
import LocationTable from './DashPageTasks/LocationTable';
import EVTable from '../Utility/GridList';

var datefomart = require('dateformat');


const CreateEventTask = ({event_id}) => ({

    getContentPage() {

        const data = store.getState().tasks.data;
        const task = store.getState().tasks.task;
        const event = store.getState().events.showEvent;

        const tableStyle = styles.taskListTable.table;
        const tableHeaderStyle = styles.taskListTable.tableHeader;
        const tableBodyStyle = styles.taskListTable.tableBody;

        const taskData = store.getState().tasks.data;
        
        if (task !== null) {

            return (<TaskInfo {...task}></TaskInfo>)
        }
        const dialogCreateTask = store.getState().tasks.dialogTask
        var dialog = null;
        if (dialogCreateTask !== null) {
            dialogCreateTask.actions.push(
                <FlatButton
                    label="Huỷ bỏ"
                    primary={true}
                    onTouchTap={() => {
                        store.dispatch(setDialogCreateTask(null))
                    }}
                />
            )
            dialog = <Dialog
                title="Chọn yêu cầu"
                actions={dialogCreateTask.actions}
                modal={false}
                open={true}
                autoScrollBodyContent={true}
                >
                {dialogCreateTask.content}
            </Dialog>
        }
        return (
            <div>
                {dialog}
                <div className="event-task-header">
                    <IconMenu
                        iconButtonElement={
                        <RaisedButton
                            label="Thêm nhiệm vụ"
                            primary={true}
                            icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        >
                            
                        </RaisedButton>}
                        
                        >
                        <MenuItem value="1" primaryText="Tạo mới" 
                            onTouchTap={() => {
                                store.dispatch(createNewTaskFromEventID(event_id));
                            }}
                        />
                        <MenuItem value="2" primaryText="Tạo với danh sách địa điểm"
                            onTouchTap={() => {
                                const dialogTask = {
                                    content: <LocationTable></LocationTable>,
                                    actions: [
                                        <FlatButton
                                            label="Tạo"
                                            primary={true}
                                            keyboardFocused={true}
                                            onTouchTap={() => {
                                                var locations = store.getState().locations.selectValues;
                                                
                                                if (locations === 'none') {
                                                    return;
                                                }

                                                if (locations === 'all') {
                                                    locations = store.getState().locations.data
                                                } else {
                                                    locations = locations.map((index) => store.getState().locations.data[index]);
                                                }
                                                
                                                store.dispatch(createTaskWithLocations(locations,event_id));
                                            }}
                                        />,
                                    ]
                                };

                                store.dispatch(setDialogCreateTask(dialogTask))
                            }}
                         />
                        <MenuItem value="3" primaryText="Tạo với danh sách vật phẩm" />
                        <MenuItem value="4" primaryText="Tạo với danh sách câu hỏi" />
                    </IconMenu>
                    <ButtonRefresh onTouchTap={() => {
                        store.dispatch(getTaskFromEventID(event_id));
                    }}/>
                </div>
                <Divider style={{
                    marginTop: 10,
                    marginBottom: 10
                }}/>
                <div className="event-task-list">
                    <EVTable {...taskData.map( (task, index) => 
                         <TaskCard {...task}
                            detailTouchTap={() => {
                                store.dispatch(setEditTask(task))
                            }}
                            deleteTouchTap={() => {
                                store.dispatch(deleteTask(task,event._id));
                            }}
                         />   
                    )} isFullWidth={true}/>
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
        store.dispatch(setEditTask(null));
    },

    componentWillMount() {
        store.dispatch(getTaskFromEventID(event_id));
    }

});

const mapStateToProps = ({tasks}) => ({
    tasks
});

export default connect(mapStateToProps)(CreateEventTask);


{/*<Table 
                        fixedHeader={true}
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
                                <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center', fontSize: 22}}>
                                    Danh sách nhiệm vụ của sự kiện
                                    <Divider style={{
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}/>
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                
                                <TableHeaderColumn tooltip="Tên">Tên</TableHeaderColumn>
                                <TableHeaderColumn  tooltip="Chi tiết">Chi tiết</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Khởi tạo">Khởi tạo</TableHeaderColumn>
                                <TableHeaderColumn  tooltip="Trạng trái">Trạng trái</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={tableHeaderStyle.showCheckboxes}
                            deselectOnClickaway={tableBodyStyle.deselectOnClickaway}
                            showRowHover={tableBodyStyle.showRowHover}
                            stripedRows={tableBodyStyle.stripedRows}
                        >
                            {taskData.map( (task, index) => (
                                <TableRow
                                 key={index}
                                 selected={false}
                                 onTouchTap={() => {
                                    store.dispatch(setEditTask(task));
                                 }}
                                 >
                                    <TableRowColumn style={styles.taskListTable.tableRow}>
                                        {task.name}
                                    </TableRowColumn>
                                    <TableRowColumn   style={styles.taskListTable.tableRow}>
                                        {task.detail}
                                    </TableRowColumn>
                                    <TableRowColumn  style={styles.taskListTable.tableRow}>
                                        {datefomart(task.created_date,'dd/mm/yy')}
                                    </TableRowColumn>
                                    <TableRowColumn  style={styles.taskListTable.tableRow}>
                                        {task.status}
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>*/}