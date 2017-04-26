import React from 'react';
// import {store} from '../../storeConfigure';
// import {} from '../../reducer/items/action';
// import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';
import {store} from '../../../storeConfigure';
import '../../../styles/App.css';
import '../../../styles/styles.css';
import styles from '../../stylesScript';

import {FaInfoCircle, FaTrashO, FaLevelUp, FaLevelDown, FaCalendarPlusO, FaArrowRight, FaCheckCircle}  from 'react-icons/lib/fa';
import {MdDirectionsWalk, MdSkipNext, MdSkipPrevious, MdInfo} from 'react-icons/lib/md';

import {Paper, CardHeader,Card, CardText,CardActions, RaisedButton} from 'material-ui';
var datefomart = require('dateformat');

const TaskCard = ({detailTouchTap, deleteTouchTap}) => ({
    
    render() {
        const task = this.props;
        const detailFuncTouch = detailTouchTap === undefined ? () => ({}) : detailTouchTap;
        const deleteFuncTouch = detailTouchTap === undefined ? () => ({}) : deleteTouchTap;
        var require_tasks = task.previous_tasks_require.length === 0 ? "Không có" : task.previous_tasks_require[0];
        var next_tasks = task.next_tasks.length === 0 ? "Không có" : task.next_tasks[0];
        if (require_tasks !== "Không có") {
            const taskRe = store.getState().tasks.data.filter((task) => task._id === require_tasks);
            require_tasks = taskRe.length !== 0 ? taskRe[0].name : "Không xác định";
        }
        if (next_tasks !== "Không có") {
            const taskRe = store.getState().tasks.data.filter((task) => task._id === next_tasks);
            next_tasks = taskRe.length !== 0 ? taskRe[0].name : "Không xác định";
        }
        const styleIcon = {
            marginRight: 8,
            marginBottom: 5,
            size: 32,
            color: styles.baseColor
        }

        return (
            <div>
                <Card>
                    <CardHeader
                    title={task.name}
                    subtitle={task.sub_name}
                    avatar={<MdDirectionsWalk  size={styles.taskIconButton.size}/>}
                    className="event-card-header"
                    /> 
                    <CardText>
                        <span>
                            <MdInfo style={styleIcon}/>
                            <b>Mô tả: </b> {task.description}<br/>
                        </span>
                        <span>
                            <FaArrowRight style={styleIcon}/>
                            <b>Loại nhiệm vụ: </b> { (task.task_type === undefined || task.task_type.length === 0) ? "Chưa xác định" : task.task_type}<br/>
                        </span>
                        <span>
                            <FaCheckCircle style={styleIcon}/>
                            <b>Cách xác nhận:  </b> { (task.task_validate_type === undefined || task.task_validate_type.length === 0) ? "Chưa xác định" : task.task_validate_type}<br/>
                        </span>
                        <span>
                            <FaCalendarPlusO style={styleIcon}/>
                            <b>Ngày tạo: </b> {datefomart(task.created_date,'dd/mm/yyyy')}<br/>
                        </span>
                        <span>
                            <MdSkipPrevious style={styleIcon}/>
                            <b>Nhiệm vụ yêu cầu: </b> {require_tasks}<br/>
                        </span>
                        <span>
                            <MdSkipNext style={styleIcon}/>
                            <b>Nhiệm vụ tiếp theo: </b> {next_tasks}<br/>
                        </span>
                    </CardText>
                    <CardActions>
                        <RaisedButton 
                        primary={true}
                        keyboardFocused={true}
                        icon={<FaInfoCircle size={20}/>} 
                        onTouchTap={detailFuncTouch}
                        label="Xem thêm" 
                        />
                        <RaisedButton 
                        secondary={true}
                        icon={<FaTrashO size={20}/>} 
                        onTouchTap={deleteFuncTouch}
                        label="Xoá"
                        />
                    </CardActions>

                </Card>
            </div>
        )
    }
})

export default TaskCard;