import React from 'react';
import {store} from '../../storeConfigure';
import {setHiddenItem, createItemm, setIsEdit, updateItem, deleteItem} from '../../reducer/items/action';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, MenuItem, CardHeader, Snackbar } from 'material-ui';
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';

import {FaChevronLeft, FaPencil, FaBan, FaFloppyO, FaTrash}  from 'react-icons/lib/fa';
import {connect} from 'react-redux';

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

const InfoItem = (props) => ({
    
    render() {
        const item = store.getState().items.item;
        const isEdit = store.getState().items.isEdit;
        const needRemoveWarnState = (store.getState().form.InfoItemForm === undefined || store.getState().form.InfoItemForm.values === undefined);

        if (!isEdit){
            store.dispatch(change('InfoItemForm','name',item.name));
            store.dispatch(change('InfoItemForm','detail',item.detail));
            store.dispatch(change('InfoItemForm','image_url',item.image_url));
            store.dispatch(change('InfoItemForm','tags',item.tags.join()));
            store.dispatch(change('InfoItemForm','status',item.status));
        } else if (needRemoveWarnState) {
            store.dispatch(setHiddenItem());
            store.dispatch(setIsEdit(false));
            return <div></div>
        }

        const itemUpdate = store.getState().form.InfoItemForm.values;
        const isEnableSaveButton = !(itemUpdate.name !== item.name || itemUpdate.detail !== item.detail || itemUpdate.image_url !== item.image_url || itemUpdate.status !== item.status || itemUpdate.tags !== item.tags.join())

        return (
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <div className="header-content">
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setHiddenItem())
                            store.dispatch(setIsEdit(false))
                        }}
                    />
                    <RaisedButton 
                        label={isEdit ? "Huỷ bỏ" : "Chỉnh sửa"}
                        primary={!isEdit}
                        icon={isEdit ?  <FaBan size={styles.headerIconButton.size}/> : <FaPencil size={styles.headerIconButton.size}/>} 
                        onTouchTap={() => {
                            console.log(isEdit);
                            store.dispatch(setIsEdit(!isEdit))
                        }}
                         style={{
                            'float': 'right',
                        }}
                    />
                    {
                        isEdit == true ? <RaisedButton 
                            label="Lưu lại"
                            primary={true}
                            icon={<FaFloppyO size={styles.headerIconButton.size}/>} 
                            onTouchTap={() => {
                                var itemUpdate = store.getState().form.InfoItemForm.values;
                                console.log(itemUpdate);
                                itemUpdate = mapFormValuesToItem(itemUpdate);
                                itemUpdate.item_id = item._id;
                                console.log(itemUpdate.item_id);
                                store.dispatch(updateItem(itemUpdate))
                            }}
                            disabled={isEnableSaveButton}
                            style={{
                                'float': 'right',
                                marginRight: 8
                            }}
                        /> : <RaisedButton 
                            label="Xoá"
                            secondary={false}
                            icon={<FaTrash size={styles.headerIconButton.size}/>} 
                            onTouchTap={() => {
                                store.dispatch(deleteItem(item))
                            }}
                            style={{
                                'float': 'right',
                                marginRight: 8
                            }}
                        />
                    }
                    </div>
                </div>
                <div className="create-event-content" style={marginDiv}>
                     <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tên vật phẩm"
                        disabled={!isEdit}
                        name="name"
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Chi tiết vật phẩm"
                        name="detail"
                        disabled={!isEdit}
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Link hình nhỏ đại diện cho vật phẩm"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="image_url"
                        disabled={!isEdit}
                        component={renderTextField}
                    />    
                    <Field
                        floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="tags"
                        disabled={!isEdit}
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Loại"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        name="status"
                        component={renderSelectField}
                        disabled={!isEdit}
                        >
                        {tags}
                    </Field>
                </div>

                {/*<div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                            () =>  {
                                {store.dispatch(createItem(
                                    mapFormValuesToItem(store.getState().form.InfoItemForm.values)
                                    ))}
                            }
                        }/>
                    <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
                 </div>
                */}
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
var InfoItemValueForm = reduxForm({
  form: 'InfoItemForm',  // a unique identifier for this form
})(InfoItem)

const selector = formValueSelector('InfoItemForm') // <-- same as form name
InfoItemValueForm = connect(
  items => {
    return {
      items
    }
  }
)(InfoItemValueForm)

export default InfoItemValueForm