import React from 'react';
import {store} from '../../storeConfigure';
import {createEvent, setHideShowDetailEvent, setIsEdit, updateEvent, deleteEvent} from '../../reducer/events/action';
import {}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, CardHeader } from 'material-ui';
import { Field, reduxForm, change, formValueSelector} from 'redux-form'
import {renderTextField, renderDatePicker, renderTimePicker} from '../Utility/ReduxField';
import {connect} from 'react-redux';

import {FaChevronLeft, FaFloppyO, FaBan, FaPencil, FaTrash}  from 'react-icons/lib/fa';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

var dateFormat = require('dateformat');

const CreateForm = (props) => ({
    componentWillMount() {
            const event = store.getState().events.showEvent;
            const isEdit = store.getState().events.isEdit || event === null;
            var defaultStartDate = new Date();
            var defaultEndDate = new Date();

            if (event !== null && !isEdit) {    
                store.dispatch(change('CreateEventForm','name',event.name));
                store.dispatch(change('CreateEventForm','sub_name',event.sub_name));
                store.dispatch(change('CreateEventForm','thumbnail_url',event.thumbnail_url));
                store.dispatch(change('CreateEventForm','cover_url',event.cover_url));
                store.dispatch(change('CreateEventForm','policy_url',event.policy_url));
                
                defaultStartDate = new Date(event.start_time);
                store.dispatch(change('CreateEventForm','start_date',defaultStartDate));
                defaultEndDate = new Date(event.end_time);
                store.dispatch(change('CreateEventForm','end_date',defaultEndDate));
            
                store.dispatch(change('CreateEventForm','description',event.detail_url));
                store.dispatch(change('CreateEventForm','limit_user',event.limit_user));
                store.dispatch(change('CreateEventForm','tags',event.tags.join()));
                store.dispatch(change('CreateEventForm','status',event.status));
            }
            
    },
    render() {
        const event = store.getState().events.showEvent;
        const isEdit = store.getState().events.isEdit || event === null;
        const needRemoveWarnState = (store.getState().form.CreateEventForm === undefined || store.getState().form.CreateEventForm.values === undefined);
        
        var defaultStartDate = new Date();
        
        var defaultEndDate = new Date();
        if (event) {
            defaultStartDate = new Date(event.start_time);
            defaultEndDate = new Date(event.end_time);
        }
        

        var eventUpdate = null;
        var isEnableSaveButton = false ;
        if (event !== null) {
            if (!isEdit){
            
            } else if (needRemoveWarnState) {
                store.dispatch(setHideShowDetailEvent());
                store.dispatch(setIsEdit(false));
                return <div></div>
            }
            eventUpdate = store.getState().form.CreateEventForm.values;
            isEnableSaveButton = !(eventUpdate.name !== event.name || 
                eventUpdate.sub_name !== event.sub_name ||
                eventUpdate.thumbnail_url !== event.thumbnail_url ||
                eventUpdate.status !== event.status || 
                eventUpdate.tags !== event.tags.join() || 
                eventUpdate.start_date !== event.start_time ||
                eventUpdate.end_date !== event.end_time
            );
        }
        
        
        return (
            <div>
                <div>
                    {
                        event !== null ? <RaisedButton 
                            label={isEdit ? "Huỷ bỏ" : "Chỉnh sửa"}
                            primary={!isEdit}
                            icon={isEdit ?  <FaBan size={styles.headerIconButton.size}/> : <FaPencil size={styles.headerIconButton.size}/>} 
                            onTouchTap={() => {
                                store.dispatch(setIsEdit(!isEdit))
                            }}
                            style={{
                                'float': 'right',
                            }}
                        /> : null
                    }
                    {
                        isEdit && event !== null == true ? <RaisedButton 
                            label="Lưu lại"
                            primary={true}
                            icon={<FaFloppyO size={styles.headerIconButton.size}/>} 
                            onTouchTap={() => {
                                var eventUpdate = store.getState().form.CreateEventForm.values;
                                eventUpdate = mapFormValuesToEvent(eventUpdate);
                                eventUpdate.event_id = event._id;

                                store.dispatch(updateEvent(eventUpdate))
                            }}
                            disabled={isEnableSaveButton}
                            style={{
                                'float': 'right',
                                marginRight: 8
                            }}
                        /> : null
                    }
                </div>
                <div className="create-event-content" style={marginDiv}>
                     <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tên sự kiện"
                        name="name"
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Solgan or Subtitle display"
                        name="sub_name"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText="Mô tả chi tiết"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
                        name="description"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText="Link hình nhỏ 64x64 đại diện cho sự kiện"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="thumbnail_url"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText="Link hình lớn đại diện cho sự kiện"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="cover_url"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText="Điều khoản dịch vụ (nếu có)"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
                        name="policy_url"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <div style={styles.divHorizontal}>
                        <Field
                            mode="landscape"
                          style={{marginRight: 10}}
                          floatingLabelStyle={styles.floatingLabelStyle}
                          floatingLabelText="Ngày bắt đầu"
                          name="start_date"
                          component={renderDatePicker}
                          disabled={!isEdit}
                          defaultDate={defaultStartDate}
                          />
                        <Field
                            
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelText="Giờ bắt đầu"
                            name="start_time"
                            component={renderTimePicker}
                            disabled={!isEdit}
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
                          disabled={!isEdit}
                          defaultDate={defaultEndDate}
                          />
                        <Field
                           
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelText="Giờ kết thúc"
                            name="end_time"
                            component={renderTimePicker}
                            disabled={!isEdit}
                        />
                    </div>
                    
                    <Field
                        floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="tags"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText='Giới hạn người tham dự'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="limit_user"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                </div>

                {this.getBottomView()}
            </div>
        )
    },

    getBottomView() {
        const event = store.getState().events.showEvent;
        const isEdit = store.getState().events.isEdit || event === null;
        var content = <div></div>;

        /*if (event !== null && !isEdit ) {
            content = (
                <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Cập nhật" primary={true} onTouchTap={
                        () => {
                            store.dispatch(setUpdateEvent(mapFormValuesToEvent(
                                store.getState().form.CreateEventForm.values
                            )))
                        }
                    }/>
                </div>
            )
        }*/

        if (event === null) {
            content = <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                        () => store.dispatch(
                            createEvent(
                                mapFormValuesToEvent(store.getState().form.CreateEventForm.values)
                                )
                            )
                    }/>
                <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
            </div>;    
        }

        return content;
    }
})

function mapFormValuesToEvent(values) {
    return {
        name: values.name,
        sub_name: values.sub_name === undefined ? "" : values.sub_name,
        thumbnail_url: values.thumbnail_url === undefined ? "" : values.thumbnail_url,
        cover_url: values.cover_url === undefined ? "" : values.cover_url,
        policy_url: values.policy_url === undefined ? "" : values.policy_url,
        detail_url: values.description === undefined ? "" : values.description,
        start_time: values.start_date.getTime() === undefined ? 0 : values.start_date.getTime(),
        end_time: values.end_date.getTime() === undefined ? 0 : values.end_date.getTime(),
        tags: values.tags === undefined ? [] : values.tags.split(",").map(value => {
            return value.trim()
        }),
        limit_user: values.limit_user === undefined ? 0 : values.limit_user
    }
}

// export default connect(mapStateToProps)(CreateEvent);
var CreateEventValueForm = reduxForm({
  form: 'CreateEventForm',  // a unique identifier for this form
})(CreateForm)

const selector = formValueSelector('CreateEventForm') // <-- same as form name
CreateEventValueForm = connect(
  events => {
    return {
      events
    }
  }
)(CreateEventValueForm)

export default CreateEventValueForm