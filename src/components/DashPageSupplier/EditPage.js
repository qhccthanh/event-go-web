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
        return (
            <div>
                <div>
                    <RaisedButton 
                    label="Trở về"
                    secondary={true}
                    icon={<FaChevronLeft></FaChevronLeft>} 
                    onTouchTap={() => {
                        store.dispatch(setIsEditSupplier())
                    }}
                    style={styles.topButton}
                    />
                    <RaisedButton 
                    label="Lưu"
                    primary={true}
                    icon={<FaFloppyO></FaFloppyO>} 
                    onTouchTap={() => {
                        store.dispatch(setIsEditSupplier())
                    }}
                    style={styles.topButton}
                    />
                </div>
                <div>
                     <TextField
                    floatingLabelText="Supplier Name"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <TextField
                    floatingLabelText="Fanpage Facebook"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <TextField
                    floatingLabelText="Description"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <TextField
                    floatingLabelText="Username"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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