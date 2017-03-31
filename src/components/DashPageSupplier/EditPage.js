import React from 'react';
import {store} from '../../storeConfigure';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import {TextField, RaisedButton, Chip} from 'material-ui';
import {orange500, blue500} from 'material-ui/styles/colors';
import {setIsEditSupplier} from '../../reducer/supplier/action';
import {FaChevronLeft, FaFloppyO}  from 'react-icons/lib/fa';
import styles from '../stylesScript';

const EditPage = (supplier) => ({
    render() {
        const supplier = store.getState().supplier.supplier;
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
                        store.dispatch(setIsEditSupplier())
                    }}
                    style={styles.topButton}
                    />
                </div>
                <div className="content-field">
                    <br/>
                    <TextField
                    floatingLabelText="Username"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    style={styles.editSupplierTextField}
                    value={supplier.username}
                    disabled={true}
                    />
                    <br/>
                     <TextField
                    floatingLabelText="Supplier Name"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    style={styles.editSupplierTextField}
                    value={supplier.name}
                    />
                    <br/>
                    <TextField
                    floatingLabelText="Fanpage Facebook"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    style={styles.editSupplierTextField}
                    value={supplier.facebook_url}
                    />
                    <br/>
                    <TextField
                    floatingLabelText="Description"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    style={styles.editSupplierTextField}
                    multiLine={true}
                    rows={3}
                    rowsMax={10}
                    value={supplier.description}
                    />
                    <div ></div>
                </div>
            </div>
        );
    }
});

const mapStateToProps = ({supplier}) => ({
    supplier
});


export default connect(mapStateToProps)(EditPage);