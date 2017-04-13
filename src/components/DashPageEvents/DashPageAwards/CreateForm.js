import React from 'react';
import {store} from '../../../storeConfigure';
import {getAwards} from '../../../reducer/awards/action';
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

const awardType = [
  <MenuItem key={1} value="item" primaryText="Vật phẩm" />,
  <MenuItem key={2} value="checkin" primaryText="Checkin" />,
  <MenuItem key={3} value="question" primaryText="Câu hỏi" />,
];

const awardDetermine = [
  <MenuItem key={2} value="input" primaryText="Nhập dữ liệu" />,
  <MenuItem key={3} value="share" primaryText="Chia sẽ" />,
];


const CreateAwardForm = (states,actions) => ({

    componentWillMount() {

        const award = store.getState().awards.award;

        if (award === null) {
            return;
        }
        store.dispatch(change('CreateAwardForm','name',award.name));
        store.dispatch(change('CreateAwardForm','detail',award.detail));
        store.dispatch(change('CreateAwardForm','image_url',award.image_url));
        store.dispatch(change('CreateAwardForm','contact',award.contact));
        store.dispatch(change('CreateAwardForm','item_id',award.item_id));
        store.dispatch(change('CreateAwardForm','type',award.type));
        store.dispatch(change('CreateAwardForm','award_type',award.award_type));
        store.dispatch(change('CreateAwardForm','tags',award.tags.join()));
        store.dispatch(change('CreateAwardForm','status',award.status));
    },
    render() {
        
        return (
        <div className="create-event-content" style={marginDiv}>
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                component={renderTextField}
                label="Tên phần thưởng"
                name="name"
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Chi tiết phần thưởng"
                name="detail"
                component={renderTextField}
            />
            <Field
                floatingLabelText="Link hình nhỏ đại diện cho phần thưởng (nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="image_url"
                component={renderTextField}
            />    
            <Field
                floatingLabelText="Cách thức nhận giải thưởng"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="contact"
                component={renderTextField}
            />
            <Field
                floatingLabelText="Vật phẩm chi tiết (nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="item_id"
                component={renderSelectField}
            ></Field>
            <Field
                floatingLabelText='Loại phẩn thưởng'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="award_type"
                component={renderSelectField}
            >
              {awardDetermine}
            </Field>
            <Field
                floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="tags"
                component={renderTextField}
            />
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
  form: 'CreateAwardForm',  // a unique identifier for this form
})(CreateAwardForm)