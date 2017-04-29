import React from 'react';
import {setEditStaff,updateStaff} from '../../reducer/staffs/action';
import {setSnackBarMessage} from '../../reducer/dashboard/action';
import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';
import {store} from '../../storeConfigure';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {FaInfoCircle, FaTrashO,
      FaCalendarPlusO, FaArrowRight, FaUserSecret}  from 'react-icons/lib/fa';
import {MdPeople}  from 'react-icons/lib/md';
import { Field, reduxForm, change, formValueSelector } from 'redux-form'

import {CardHeader,Card, CardText,CardActions, RaisedButton,CardTitle} from 'material-ui';
var datefomart = require('dateformat');
import {renderTextField} from '../Utility/ReduxField';

const StaffCard = ({detailTouchTap, deleteTouchTap}) => ({
    
    render() {
        const staff = this.props;
        const detailFuncTouch = detailTouchTap === undefined ? () => ({}) : detailTouchTap;
        const deleteFuncTouch = detailTouchTap === undefined ? () => ({}) : deleteTouchTap;
        
        const styleIcon = {
            marginRight: 8,
            marginBottom: 5,
            size: 32,
            color: styles.baseColor
        }
        const editStaff = store.getState().staffs.staff;
        const isExapaned = editStaff !== null &&  editStaff._id === staff._id
        console.log(isExapaned);
        return (
            <div>
                <Card expanded={isExapaned}>
                    <CardHeader
                    title={staff.name}
                    subtitle={staff.username}
                    avatar={staff.image_url === undefined ? <MdPeople size={styles.staffIconButton.size}/> : <img src={staff.image_url}/>}
                    className="event-card-header"
                    /> 
                    <CardText>
                        <span>
                            <FaUserSecret style={styleIcon}/>
                            <b>Quyền: </b> {staff.role}<br/>
                        </span>
                        <span>
                            <FaCalendarPlusO style={styleIcon}/>
                            <b>Ngày tạo: </b> {datefomart(staff.created_date,'dd/mm/yyyy')}<br/>
                        </span>
                    </CardText>
                    <CardText expandable={true}>
                        <h3>Đổi mật khẩu</h3>
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
                    </CardText>
                    {isExapaned ? (
                        <div>
                            <CardActions>
                                <RaisedButton 
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={() => {
                                    const form = store.getState().form.ChangePasswordStaffForm;
                                    if (form === undefined || form === null) {
                                        return
                                    }
                                    const values = form.values;
                                    if (values === undefined || values === null) {
                                        return
                                    }
                                    const password = values.password === undefined ? '' : values.password;
                                    const verify_password = values.verify_password === undefined ? '' : values.verify_password;
                                    if (password !== verify_password || password === '' || password.length < 6)  {
                                        store.dispatch(setSnackBarMessage('Vui lòng nhập đẩy đủ dữ liệu',2000));
                                        return
                                    }
                                    var staffUpdate = store.getState().staffs.staff;
                                    staffUpdate = {
                                        ...staffUpdate,
                                        password
                                    }
                                    store.dispatch(updateStaff(staffUpdate));
                                }}
                                label="Xong" 
                                />
                                <RaisedButton 
                                secondary={true}
                                 onTouchTap={() => {
                                    store.dispatch(setEditStaff(null));
                                }}
                                label="Huỷ bỏ"
                                />
                            </CardActions>
                        </div>) :
                         (<div>
                            <CardActions>
                                <RaisedButton 
                                primary={true}
                                keyboardFocused={true}
                                icon={<FaInfoCircle size={20}/>} 
                                onTouchTap={() => {
                                    const edit = editStaff === null ? staff : null
                                    store.dispatch(setEditStaff(edit));
                                }}
                                label="Đổi mật khẩu" 
                                />
                                <RaisedButton 
                                secondary={true}
                                icon={<FaTrashO size={20}/>} 
                                onTouchTap={deleteFuncTouch}
                                label="Xoá"
                                />
                            </CardActions>
                        </div>)}
                </Card>
            </div>
        )
    }
})

var ChangePasswordStaffForm = reduxForm({
  form: 'ChangePasswordStaffForm',  // a unique identifier for this form
})(StaffCard)

const selector = formValueSelector('ChangePasswordStaffForm') // <-- same as form name
ChangePasswordStaffForm = connect(
  staffs => {
    return {
      staffs
    }
  }
)(ChangePasswordStaffForm)

export default ChangePasswordStaffForm