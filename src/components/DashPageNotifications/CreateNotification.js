import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createNotification} from '../../reducer/notifications/action';
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


const CreateNotification = (props) => ({
    
    render() {
        // const { handleSubmit, pristine, reset, submitting } = props;
        return (
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated(false))
                        }}
                    />
                </div>
                <div className="create-event-content" style={marginDiv}>
                     <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tiêu đề"
                        name="title"
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Nội dung thông báo"
                        name="body"
                        component={renderTextField}
                    />
                </div>

                <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                            () => store.dispatch(
                                createNotification(
                                    mapFormValuesToTitle(store.getState().form.CreateNotificationForm.values)
                                    )
                                )
                        }/>
                    <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
                 </div>
            </div>
        )
    }
})

function mapFormValuesToTitle(values) {
    return {
        // name: values.name,
        // sub_name: values.sub_name,
        // thumbnail_url: values.thumbnail_url,
        // cover_url: values.cover_url,
        // policy_url: values.policy_url,
        // detail_url: values.description,
        // start_time: values.start_date.getTime(),
        // // start_time: values.end_date.getTime(),
        // tags: [ values.tags],
        // limit_user: values.limit_user
        title: values.title,
        body: values.body,
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateNotificationForm',  // a unique identifier for this form
})(CreateNotification)