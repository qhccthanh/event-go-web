import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createItem} from '../../reducer/items/action';
import {setSnackBarMessage} from '../../reducer/dashboard/action';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, MenuItem, CardHeader } from 'material-ui';
import { Field, reduxForm, change } from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';

import {FaChevronLeft}  from 'react-icons/lib/fa';
const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

const tags = [
  <MenuItem key={1} value="Vật phẫm" primaryText="Vật phẫm" />,
  <MenuItem key={2} value="Voucher" primaryText="Voucher" />,
  <MenuItem key={3} value="Dịch vụ" primaryText="Dịch vụ" />,
];

const CreateItem = (props) => ({
    
    render() {
        // const { handleSubmit } = props;
        var itemCreate = store.getState().form.CreateItemForm;
        const preConditionValidation = itemCreate === undefined || itemCreate.values === undefined;

        const showErrorName = preConditionValidation || itemCreate.values.name === undefined || itemCreate.values.name.length === 0;

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
                        label="Tên vật phẩm"
                        errorText={showErrorName ? "Vui lòng nhập liệu ô này không thể bỏ trống":null}
                        name="name"
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Chi tiết vật phẩm"
                        name="detail"
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Link hình nhỏ đại diện cho vật phẩm"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="image_url"
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
                        floatingLabelText="Loại"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        name="status"
                        component={renderSelectField}
                        >
                        {tags}
                    </Field>
                </div>

                <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                            () =>  {
                                const form = store.getState().form.CreateItemForm;
                                const validationMess = validateCanCreateItem(form);

                                if (validateCanCreateItem === null) {
                                    store.dispatch(createItem(
                                        mapFormValuesToItem(form.values)
                                    ));
                                    return ;
                                }
                                store.dispatch(setSnackBarMessage(validationMess,2000));
                            }
                        }/>
                    <RaisedButton 
                        label="Làm mới"
                        secondary={false} 
                        style={{marginLeft: 10}}
                        onTouchTap={
                            () =>  {
                                store.dispatch(change('CreateItemForm','name',''));
                                store.dispatch(change('CreateItemForm','detail',''));
                                store.dispatch(change('CreateItemForm','image_url',''));
                                store.dispatch(change('CreateItemForm','tags',''));
                                store.dispatch(change('CreateItemForm','status',''));
                        }}
                    />
                 </div>
            </div>
        )
    }
})

function validateCanCreateItem(form) {
    
    if (form.values === undefined) {
        return "Dữ liệu không thể rỗng";
    }

    const values = form.values;

    if (!values) {
        return "Dữ liệu không thể rỗng";
    }

    if (values.name === undefined) {
        return "Tên vật phẫm không thễ rỗng";
    }

    if (values.detail === undefined) {
        return "Chi tiết vật phẫm không thễ rỗng";
    }

    return null;
}

function mapFormValuesToItem(values) {
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
  form: 'CreateItemForm',  // a unique identifier for this form
})(CreateItem)