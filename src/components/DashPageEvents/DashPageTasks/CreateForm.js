import React from 'react';
import {store} from '../../../storeConfigure';
import {getTasks} from '../../../reducer/tasks/action';
import {setSnackBarMessage} from '../../../reducer/dashboard/action';
import {connect}  from 'react-redux';

import '../../../styles/App.css';
import '../../../styles/styles.css';
import styles from '../../stylesScript';

import { Field, reduxForm, change } from 'redux-form'
import {renderTextField, renderSelectField, renderDatePicker, renderTimePicker} from '../../Utility/ReduxField';
import { MenuItem } from 'material-ui';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

const tags = [
  <MenuItem key={1} value="opening" primaryText="Đang mở" />,
  <MenuItem key={2} value="closed" primaryText="Đóng" />,
  <MenuItem key={3} value="paused" primaryText="Tạm dừng" />,
];

const taskType = [
  <MenuItem key={1} value="item" primaryText="Tìm vật phẩm" />,
  <MenuItem key={2} value="location" primaryText="Tìm địa điểm" />,
  <MenuItem key={3} value="question" primaryText="Trả lời câu hỏi" />,
];

const taskValidateType = [
  <MenuItem key={2} value="input" primaryText="Nhập dữ liệu" />,
  <MenuItem key={3} value="share" primaryText="Chia sẽ" />,
  <MenuItem key={1} value="photo" primaryText="Chụp ảnh xác nhận" />,
];

var required_tasks = [
  <MenuItem key={1} value="12321312" primaryText="Mua Siting" />,
]

var next_task = [
  <MenuItem key={1} value="435232" primaryText="Tìm cửa hàng" />,
]

const CreateTaskForm = (states,actions) => ({

    componentWillMount() {

        const task = store.getState().tasks.task;
        const otherTask = store.getState().tasks.data.filter((oTask) => {
            return oTask._id !== task._id;
        });

        required_tasks = otherTask.map((oTask) => (
            <MenuItem key={oTask._id} value={oTask._id} primaryText={oTask.name} />)
        )

        next_task = otherTask.map((oTask) => (
            <MenuItem key={oTask._id} value={oTask._id} primaryText={oTask.name} />)
        )

        if (task === null) {
            return;
        }
        store.dispatch(change('CreateTaskForm','name',task.name));
        store.dispatch(change('CreateTaskForm','sub_name',task.sub_name));
        store.dispatch(change('CreateTaskForm','description',task.description));
        store.dispatch(change('CreateTaskForm','thumbnail_url',task.thumbnail_url));
        store.dispatch(change('CreateTaskForm','cover_url',task.cover_url));
        store.dispatch(change('CreateTaskForm','policy_url',task.policy_url));
        store.dispatch(change('CreateTaskForm','detail_url',task.detail_url));
        store.dispatch(change('CreateTaskForm','task_type',task.task_type));
        store.dispatch(change('CreateTaskForm','task_validate_type',task.task_validate_type));
        store.dispatch(change('CreateTaskForm','tags',task.tags.join()));
        store.dispatch(change('CreateTaskForm','max_num_finish_task',task.max_num_finish_task));
        store.dispatch(change('CreateTaskForm','status',task.status));

        const next_tasks = task.next_tasks; 
        const previous_tasks_require = task.previous_tasks_require;
        store.dispatch(change('CreateTaskForm','next_tasks',next_tasks.count === 0 ? "" : next_tasks[0]));
        store.dispatch(change('CreateTaskForm','previous_tasks_require',previous_tasks_require.count === 0 ? "" : previous_tasks_require[0]));
    },
    render() {
        
        return (
        <div className="create-event-content" style={marginDiv}>
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                component={renderTextField}
                label="Tên nhiệm vụ"
                name="name"
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Tên phụ"
                name="sub_name"
                component={renderTextField}
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Mô tả"
                name="description"
                component={renderTextField}
            />
            <Field
                floatingLabelText="Link hình nhỏ đại diện cho nhiệm vụ (nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="thumbnail_url"
                component={renderTextField}
            />    
            <Field
                floatingLabelText="Link hình ảnh nền cho nhiệm vụ (nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="cover_url"
                component={renderTextField}
            />
            <Field
                floatingLabelText="Link chi tiết thêm ví dụ facebook(nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="detail_url"
                component={renderTextField}
            />
            <Field
                floatingLabelText='Chọn loại nhiệm vụ (item,location)'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="task_type"
                component={renderSelectField}
            >
            {taskType}
            </Field>
            <Field
                floatingLabelText='Cách xác nhận nhiệm vụ'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="task_validate_type"
                component={renderSelectField}
            >
            {taskValidateType}
            </Field>
            <Field
                floatingLabelText='Số nhiệm vụ hoàn thành tối đa'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="max_num_finish_task"
                component={renderTextField}
            />
            <Field
                floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="tags"
                component={renderTextField}
            />
            <Field
                floatingLabelText="Nhiệm vụ yêu cầu hoàn thành trước đó"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                name="previous_tasks_require"
                component={renderSelectField}
                fullWidth={true}
                >
                {required_tasks}
            </Field>
            <Field
                floatingLabelText="Nhiệm vụ tiếp theo"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                name="next_tasks"
                component={renderSelectField}
                fullWidth={true}
                >
                {next_task}
            </Field>
            <Field
                floatingLabelText="Trạng thái"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                name="status"
                component={renderTextField}
                disabled={true}
                >
            </Field>
        </div>
        )
    }
});

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateTaskForm',  // a unique identifier for this form
})(CreateTaskForm)