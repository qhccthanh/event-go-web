import React from 'react';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Divider, RaisedButton,
     Dialog, FlatButton, Table,
      TableHeader,TableRow, TableBody,
      TableHeaderColumn, TableRowColumn, IconButton
    } from 'material-ui';
import {FaPlusCircle, FaTrash} from 'react-icons/lib/fa';
import {setIsCreated, setAddNewTask,
     deleteTask, setEditTask,updateTask, createNewTaskFromEventID, 
      getTaskFromEventID} from '../../reducer/tasks/action';

import {setSnackBarMessage} from '../../reducer/dashboard/action';

import ButtonRefresh from '../Utility/ButtonRefresh';

import CreateForm from './DashPageTasks/CreateForm';
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

            return (<div> 
                <CreateForm></CreateForm>
                <Divider></Divider>
                <div style={{
                    ...styles.divHorizontal,
                    'float': 'right'
                }}>
                    <RaisedButton
                        label="Cập nhật"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => {
                            if (!checkUpdatable(task)) {
                                store.dispatch(setSnackBarMessage("Vui lòng thay đổi dữ liệu",2000));
                                return;
                            }
                            var taskUpdate = store.getState().form.CreateTaskForm.values;                            
                            taskUpdate = mapFormValuesToTask(taskUpdate);
                            taskUpdate._id = task._id;
                            taskUpdate.task_id = task._id;
                            store.dispatch(updateTask(taskUpdate,event._id))
                        }}
                        style={styles.buttonMargin}
                        
                    />
                    <RaisedButton
                        label="Xoá"
                        secondary={true}
                        onTouchTap={() => {
                            store.dispatch(deleteTask(task,event._id));
                        }}
                        style={styles.buttonMargin}
                    />
                    <FlatButton
                    label="Trở lại"
                    primary={true}
                    onTouchTap={this.handleCloseCreate}
                    style={styles.buttonMargin}
                    />,
                </div>
            </div>)
        }

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
                        store.dispatch(getTaskFromEventID(event_id));
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
                                <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center', fontSize: 22}}>
                                    Danh sách nhiệm vụ của sự kiện
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
        store.dispatch(setEditTask(null));
    },

    componentWillMount() {
        store.dispatch(getTaskFromEventID(event_id));
    }

});

const mapStateToProps = ({tasks}) => ({
    tasks
});

function checkUpdatable(task) {
    const form = store.getState().form.CreateTaskForm;
    if (form === null || form  === undefined) {
        return false;
    }
    const values = form.values;
    return (
        task.name !== values.name ||
        task.detail !== values.detail ||
        task.thumbnail_url !== values.thumbnail_url ||
        task.cover_url !== values.cover_url || 
        task.detail_url !== values.detail_url || 
        task.task_type !== values.task_type || 
        task.task_determine !== values.task_determine || 
        task.previous_tasks_require.join() !== values.previous_tasks_require || 
        task.next_tasks.join() !== values.next_tasks || 
        task.tags.join() !== values.tags 
    )
}

function mapFormValuesToTask(values) {
    if (!values || values === undefined) {
        return {};
    }

    return {
        name: values.name === undefined ? "" : values.name,
        detail: values.detail === undefined ? "" : values.detail,
        thumbnail_url: values.thumbnail_url === undefined ? "" : values.thumbnail_url,
        cover_url: values.cover_url === undefined ? "" : values.cover_url,
        detail_url: values.detail_url === undefined ? "" : values.detail_url,
        task_type: values.task_type === undefined ? "" : values.task_type,
        task_determine: values.task_determine === undefined ? "" : values.task_determine,
        max_num_finish_task: values.max_num_finish_task === undefined ? 0 : values.max_num_finish_task,
        previous_tasks_require: values.previous_tasks_require === undefined ? [] : [values.previous_tasks_require],
        next_tasks: values.next_tasks === undefined ? [] : [values.next_tasks],
        tags: values.tags === undefined ? [] : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status === undefined ? "" : values.status
    }
}

export default connect(mapStateToProps)(CreateEventTask);

