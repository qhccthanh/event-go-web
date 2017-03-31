import React from 'react';
import {store} from '../../storeConfigure';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import {TextField, RaisedButton} from 'material-ui';
import {orange500, blue500} from 'material-ui/styles/colors';
import {setIsEditSupplier} from '../../reducer/supplier/action';
import {FaChevronLeft, FaFloppyO}  from 'react-icons/lib/fa';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  topButton: {
      marginRight: 10,
  }
};

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
                    hintText="Supplier Name"
                    hintStyle={styles.errorStyle}
                    /><br />
                    <TextField
                    hintText="Custom error color"
                    errorText="This field is required."
                    errorStyle={styles.errorStyle}
                    /><br />
                    <TextField
                    hintText="Custom Underline Color"
                    underlineStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                    hintText="Custom Underline Focus Color"
                    underlineFocusStyle={styles.underlineStyle}
                    /><br />
                    <TextField
                    floatingLabelText="Styled Floating Label Text"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                </div>
            </div>
        );
    }
});

const mapStateToProps = ({supplier}) => ({
    supplier
});


export default connect(mapStateToProps)(EditPage);