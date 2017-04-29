import React from 'react';
import {store} from '../../storeConfigure';
import {getStaffs, setIsCreated, createStaff} from '../../reducer/staffs/action';
import {setSnackBarMessage} from '../../reducer/dashboard/action';
import {connect}  from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { Field, reduxForm, change } from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';
import { MenuItem, RaisedButton } from 'material-ui';
import { FaChevronLeft}  from 'react-icons/lib/fa';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

const statusStaff = [
  <MenuItem key={1} value="active" primaryText="Hoạt động" />,
  <MenuItem key={2} value="deactive" primaryText="Dừng hoạt động"/>,
];

const roleStaff = [
  <MenuItem key={1} value="readonly" primaryText="Chỉ xem" />,
  <MenuItem key={2} value="fullaccess" primaryText="Xem và sửa"/>,
];

const CreateStaffForm = (states,actions) => ({

    componentWillMount() {

        const staff = store.getState().staffs.staff;
        store.dispatch(change('CreateStaffForm','role','fullaccess'));
        store.dispatch(change('CreateStaffForm','status','active'));
        if (staff === null) {
            return;
        }
        store.dispatch(change('CreateStaffForm','name',staff.image_url));
        store.dispatch(change('CreateStaffForm','username',staff.username));
        // store.dispatch(change('CreateStaffForm','password',staff.password));
        store.dispatch(change('CreateStaffForm','image_url',staff.image_url));
        store.dispatch(change('CreateStaffForm','role',staff.role));
        store.dispatch(change('CreateStaffForm','status',staff.status));
    },
    render() {
        
        return (
        <div className="create-event-content" style={marginDiv}>
            <div className="create-event-header" style={styles.floatingLabelStyle}>
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated(false))
                        }}
                    />
                    
                    <RaisedButton style={{'float': 'right'}} label="Tạo" primary={true} onTouchTap={
                        () => {
                            const form = store.getState().form.CreateStaffForm;
                            const data = mapFormValuesToStaff(form);

                            if (typeof data !== 'string') {
                                
                                console.log(data);
                                store.dispatch(createStaff(data));
                                return;
                            }
                            store.dispatch(setSnackBarMessage(data,2000));
                        }
                    }/>
            </div>
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                component={renderTextField}
                label="Tên nhân viên"
                name="name"
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Tên đăng nhập"
                name="username"
                component={renderTextField}
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Mật khẩu"
                name="password"
                type='password'
                component={renderTextField}
            />
            <Field
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                label="Nhập lại mật khẩu"
                name="verify_password"
                type='password'
                component={renderTextField}
            />
            <Field
                floatingLabelText="Link ảnh đại diện (nếu có)"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="image_url"
                component={renderTextField}
            />    
            <Field
                floatingLabelText='Quyền'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="role"
                component={renderSelectField}
            >
              {roleStaff}
            </Field>
            <Field
                floatingLabelText='Trạng thái'
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                fullWidth={true}
                name="status"
                component={renderSelectField}
            >
                {statusStaff}
            </Field>
        </div>
        )
    }
});

function mapFormValuesToStaff(form) {
    
    if (form.values === undefined) {
        return "Vui lòng nhập dữ liệu";
    }
    var values = form.values;
    if (typeof values.name !== "string" || values.name.length < 5) {
        return "Tên hiển thị phải lớn hơn 5 ký tự";
    }

    if (typeof values.username !== "string" || values.username.length < 5) {
        return "Tên đăng nhập phải lớn hơn 5 ký tự";
    }

    if (typeof values.password !== "string" || values.password.length < 6) {
        return "Tên mật khẩu phải lớn hơn 6 ký tự";
    }

    if (typeof values.verify_password !== "string" || values.verify_password.length < 6) {
        return "Tên mật khẩu phải lớn hơn 6 ký tự";
    }

    if (values.verify_password !== values.password) {
        return "Mật khẩu không khớp với nhau";
    }

    return {
        name: values.name,
        username: values.username,
        password: values.password,
        image_url: values.image_url === undefined ? "": values.image_url,
        role: values.role === undefined ? "fullaccess": values.role,
        status: values.status === undefined ? "active": values.status
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateStaffForm',  // a unique identifier for this form
})(CreateStaffForm)