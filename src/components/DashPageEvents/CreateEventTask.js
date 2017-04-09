import React from 'react';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Divider, RaisedButton, Dialog, FlatButton} from 'material-ui';
import {FaPlusCircle} from 'react-icons/lib/fa';
import {setIsCreated, setAddNewTask, setDeleteTask, setEditTask, setUpdateTask} from '../../reducer/tasks/action';
import ButtonRefresh from '../Utility/ButtonRefresh';

import CreateForm from './DashPageTasks/CreateForm';

const CreateEventTask = () => ({

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

        return (
            <div>
                <div className="event-task-header">
                    <RaisedButton 
                        label="Thêm nhiệm vụ"
                        primary={true}
                        icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated(true));
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