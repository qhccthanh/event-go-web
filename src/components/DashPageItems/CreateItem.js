import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createItem} from '../../reducer/items/action';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, MenuItem, CardHeader } from 'material-ui';
import { Field, reduxForm } from 'redux-form'
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
                            () => store.dispatch(
                                createItem(
                                    mapFormValuesToItem(store.getState().form.CreateItemForm.values)
                                    )
                                )
                        }/>
                    <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
                 </div>
            </div>
        )
    }
})

function mapFormValuesToItem(values) {
    return {
        name: values.name,
        detail: values.detail,
        image_url: values.image_url,
        tags: values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'CreateItemForm',  // a unique identifier for this form
})(CreateItem)