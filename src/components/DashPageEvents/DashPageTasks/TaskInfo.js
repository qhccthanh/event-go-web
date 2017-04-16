
import React from 'react';
import {store} from '../../../storeConfigure';
import {connect} from 'react-redux';

import '../../../styles/App.css';
import '../../../styles/styles.css';
import styles from '../../stylesScript';

import {Divider, RaisedButton,
      FlatButton,IconMenu,
      IconButton, MenuItem
    } from 'material-ui';
import {FaPlusCircle} from 'react-icons/lib/fa';
import { deleteTask,updateTask, setEditTask} from '../../../reducer/tasks/action';

import {setSnackBarMessage} from '../../../reducer/dashboard/action';
import CreateForm from './CreateForm';

const TaskInfo = () =>  ({

    render() {
        const task = this.props;
        return (<div> 
                <CreateForm></CreateForm>
                <Divider></Divider>
                <div style={{
                    ...styles.divHorizontal,
                    'float': 'right',
                    marginTop: 8,
                    marginBottom: 8
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
                            store.dispatch(updateTask(taskUpdate,task.event_id))
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
    },

    handleCloseCreate() {
        store.dispatch(setEditTask(null));
    },

})

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
        description: values.description === undefined ? "" : values.description,
        sub_name: values.sub_name === undefined ? "" : values.sub_name,
        thumbnail_url: values.thumbnail_url === undefined ? "" : values.thumbnail_url,
        cover_url: values.cover_url === undefined ? "" : values.cover_url,
        detail_url: values.detail_url === undefined ? "" : values.detail_url,
        task_type: values.task_type === undefined ? "" : values.task_type,
        task_validate_type: values.task_validate_type === undefined ? "" : values.task_validate_type,
        max_num_finish_task: values.max_num_finish_task === undefined ? 0 : values.max_num_finish_task,
        previous_tasks_require: values.previous_tasks_require === undefined ? [] : [values.previous_tasks_require],
        next_tasks: values.next_tasks === undefined ? [] : [values.next_tasks],
        tags: values.tags === undefined ? [] : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status === undefined ? "" : values.status
    }
}

const mapStateToProps = ({tasks}) => ({
    tasks
});

export default connect(mapStateToProps)(TaskInfo);