import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createEvent} from '../../reducer/events/action';
import {}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, CardHeader } from 'material-ui';
import { Field, reduxForm } from 'redux-form'
import {renderTextField, renderDatePicker, renderTimePicker} from '../Utility/ReduxField';

import {FaChevronLeft}  from 'react-icons/lib/fa';
const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }


const CreateEvent = (props) => ({
    
    render() {
        // const {  } = props;
        return (
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated())
                        }}
                    />
                     <CardHeader
                        title="Tạo sự kiện"
                        subtitle="Tạo sự kiện để hoạt động trên ứng dụng. Thông báo cho user và thêm nhiều thông tin khác xem. Vui lòng điền đầy đủ thông tin để tạo sự kiện đem đến trải nghiệm người dùng tốt nhất"
                    />
                </div>
                <div className="create-event-content" style={marginDiv}>
                     <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tên sự kiện"
                        name="name"
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Solgan or Subtitle display"
                        name="sub_name"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Link hình nhỏ 64x64 đại diện cho sự kiện"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="thumbnail_url"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Link hình lớn đại diện cho sự kiện"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="cover_url"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Điều khoản dịch vụ (nếu có)"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
                        name="policy_url"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Mô tả chi tiết"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
                        name="description"
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
                        floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="tags"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText='Giới hạn người tham dự'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="limit_user"
                        component={renderTextField}
                    />
                </div>

                <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                            () => store.dispatch(
                                createEvent(
                                    mapFormValuesToEvent(store.getState().form.CreateEventForm.values)
                                    )
                                )
                        }/>
                    <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
                 </div>
            </div>
        )
    }
})

function mapFormValuesToEvent(values) {
    return {
        name: values.name,
        sub_name: values.sub_name,
        thumbnail_url: values.thumbnail_url,
        cover_url: values.cover_url,
        policy_url: values.policy_url,
        detail_url: values.description,
        start_time: values.start_date.getTime(),
        end_time: values.end_date.getTime(),
        tags: [ values.tags],
        limit_user: values.limit_user
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateEventForm',  // a unique identifier for this form
})(CreateEvent)