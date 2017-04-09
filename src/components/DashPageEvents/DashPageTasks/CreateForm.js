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
  <MenuItem key={1} value="item" primaryText="Vật phẩm" />,
  <MenuItem key={2} value="checkin" primaryText="Checkin" />,
  <MenuItem key={3} value="question" primaryText="Câu hỏi" />,
];

const taskDetermine = [
  <MenuItem key={2} value="input" primaryText="Nhập dữ liệu" />,
  <MenuItem key={3} value="share" primaryText="Chia sẽ" />,
];

var required_tasks = [
  <MenuItem key={1} value="12321312" primaryText="Mua Siting" />,
]

var next_task = [
  <MenuItem key={1} value="435232" primaryText="Tìm cửa hàng" />,
]

const CreateTaskForm = (states,actions) => ({

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
            label="Chi tiết nhiệm vụ"
            name="detail"
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
        <div style={styles.divHorizontal}>
            <Field
                mode="landscape"
              style={{marginRight: 10}}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelText="Ngày bắt đầu"
              name="start_date"
              component={renderDatePicker}
              />
            <Field
                
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Giờ bắt đầu"
                name="start_time"
                component={renderTimePicker}
            />
        </div>
        <div style={styles.divHorizontal}>
            <Field
              mode="landscape"
              style={{marginRight: 10}}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelText="Ngày kết thúc"
              name="end_date"
              component={renderDatePicker}
              />
            <Field
                
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Giờ kết thúc"
                name="end_time"
                component={renderTimePicker}
            />
        </div>
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
            name="task_determine"
            component={renderSelectField}
        >
          {taskDetermine}
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
            component={renderSelectField}
            >
            {tags}
        </Field>
    </div>
    )
  }
});

function mapFormValuesToTask(values) {
    return {
        name: values.name,
        detail: values.detail,
        image_url: values.image_url === undefined ? "" : values.image_url,
        tags: values.tags === undefined ? "" : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status === undefined ? "" : values.status
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateTaskForm',  // a unique identifier for this form
})(CreateTaskForm)