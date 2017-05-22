import React from 'react';
import {store} from '../../storeConfigure';
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import {TextField, RaisedButton} from 'material-ui';

// import {orange500, blue500} from 'material-ui/styles/colors';
import {FaChevronLeft, FaFloppyO}  from 'react-icons/lib/fa';
import styles from '../stylesScript';

import {updateInfo, setIsEditSupplier} from '../../reducer/supplier/action';

const EditPage = (supplier) => ({
    componentWillMount() {
        const supplier = store.getState().supplier.supplier;
        const isEditInfo = store.getState().supplier.isEditInfo;

        if (isEditInfo){
            console.log(supplier);
            store.dispatch(change('EditSupplierValueForm','name',supplier.name));
            store.dispatch(change('EditSupplierValueForm','username',supplier.username));
        }
    },
    render() {
       
        return (
            <div>
                <div className="top-button">
                    <RaisedButton 
                    label="Trở về"
                    secondary={true}
                    icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                    onTouchTap={() => {
                        store.dispatch(setIsEditSupplier())
                    }}
                    style={styles.topButton}
                    />
                    <RaisedButton 
                    label="Lưu"
                    primary={true}
                    icon={<FaFloppyO size={styles.headerIconButton.size}></FaFloppyO>} 
                    onTouchTap={() => {
                        let form = store.getState().form.EditSupplierValueForm
                        if (form === null || form === undefined) {
                            store.dispatch(setIsEditSupplier())
                            return;
                        }
                        let values = form.values;
                        let name = values.name === undefined ? "" : values.name;
                        store.dispatch(updateInfo({
                            'name': name
                        }))
                    }}
                    style={styles.topButton}
                    />
                </div>
                <div className="content-field">
                    <br/>
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tên tài khoản"
                        name="username"
                        disabled={true}
                    />
                    <br/>
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        component={renderTextField}
                        label="Tên nhà cung cấp"
                        name="name"
                    />
                    <div ></div>
                </div>
            </div>
        );
    }
});

var EditSupplierValueForm = reduxForm({
  form: 'EditSupplierValueForm',  // a unique identifier for this form
})(EditPage);

const selector = formValueSelector('EditSupplierValueForm') // <-- same as form name
EditSupplierValueForm = connect(
  supplier => {
    return {
      supplier
    }
  }
)(EditSupplierValueForm)

export default EditSupplierValueForm