import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createLocation, getSearchAddress} from '../../reducer/locations/action';
import {setSnackBarMessage} from '../../reducer/dashboard/action';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, MenuItem } from 'material-ui';
import { Field, reduxForm, formValueSelector} from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';
import {connect} from 'react-redux';

import { FaChevronLeft, FaSearch}  from 'react-icons/lib/fa';

import EVMap from '../Utility/EVMap';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

const tags = [
  <MenuItem key={1} value="under_contrustion" primaryText="Đang xây" />,
  <MenuItem key={2} value="opening" primaryText="Đang mở cửa" />,
  <MenuItem key={3} value="closing" primaryText="Đóng cửa" />,
];

const CreateLocation = (props) => ({
    
    render() {
        // const { handleSubmit} = props;
        const errorSearch = store.getState().locations.errorSearch;
        const searchData = store.getState().locations.dataSearch;
        const markers =  searchData === null ? [] : [
            {
                position: searchData.coordinate,
                key: searchData.formatted_address,
                defaultAnimation: 2,
            }
        ]
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
                        label="Tên vị trí"
                        name="name"
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Chi tiết"
                        name="detail"
                        component={renderTextField}
                    />
                    <div style={styles.divHorizontal}>
                        <Field
                            floatingLabelText="Địa chỉ"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            name="address"
                            component={renderTextField}
                            fullWidth={true}
                            errorText={errorSearch}
                        />
                        <RaisedButton label="Tìm" 
                            icon={<FaSearch size={styles.headerIconButton.size}></FaSearch>} 
                            onTouchTap={() => {

                                const form = store.getState().form.CreateLocationForm;
                                if (form === undefined) {
                                    return;
                                }
                                const values = form.values;
                                if (values === undefined || values.address === undefined) {
                                    return;
                                }

                                store.dispatch(getSearchAddress(values.address));
                            }}
                            style={{
                                height: 36,
                                marginLeft: 10,
                                marginTop: 20,
                            }}
                        />
                    </div>
                    {
                        searchData === null ? null : (
                            <EVMap
                                containerElement={
                                    <div style={styles.createLocationMap}
                                        className="col-xs-12"/>
                                }
                                mapElement={
                                    <div style={styles.createLocationMap} 
                                        className="col-xs-12"/>
                                }
                                markers={markers}
                                center={searchData.coordinate}
                            >

                           </EVMap>
                        )
                    }
                    <Field
                        floatingLabelText="Link địa điểm (nếu có)"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="links"
                        multiLine={true}
                        component={renderTextField}
                    />
                    <Field
                        floatingLabelText="Ảnh đại diện của địa điểm (nếu có)"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
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
                        floatingLabelText='Trạng thái'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="status"
                        component={renderSelectField}
                    >
                        {tags}
                    </Field>
                </div>

                <div className="create-event-footer" style={marginDiv}>
                    <RaisedButton label="Tạo" primary={true} onTouchTap={
                            () => {
                                const form = store.getState().form.CreateLocationForm;
                                const validationMess = validateCanCreateLocation(form);

                                if (validationMess === null) {
                                    const dataEmit = mapFormValuesToLocation(form.values);
                                    console.log(dataEmit);
                                    store.dispatch(createLocation(dataEmit));
                                    return;
                                }
                                store.dispatch(setSnackBarMessage(validationMess,2000));
                            }
                        }/>
                    <RaisedButton label="Làm mới" secondary={false} style={{marginLeft: 10}}/>
                 </div>
            </div>
        )
    }
})

function validateCanCreateLocation(form) {
    
    if (form.values === undefined) {
        return "Dữ liệu không thể rỗng";
    }

    const values = form.values;

    if (!values) {
        return "Dữ liệu không thể rỗng";
    }

    if (values.name === undefined) {
        return "Tên địa điểm không thễ rỗng";
    }

    if (values.detail === undefined) {
        return "Chi tiết địa điểm không thễ rỗng";
    }
    const searchData = store.getState().locations.dataSearch;
    if (values.address === undefined) {
        return "Địa chỉ địa điểm không thễ rỗng";
    }

    if (searchData === null) {
        return "Vui lòng bấm nút tìm kiếm để lấy thông tin địa điểm";
    }

    return null;
}

function mapFormValuesToLocation(values) {
    const searchData = store.getState().locations.dataSearch;
    return {
        name: values.name,
        detail: values.detail,
        address: values.address,
        links: values.link === undefined ? [] : values.link.split(",").map(value => {
            return value.trim()
        }),
        image_url: values.image_url,
        location_info: searchData,
        tags: values.tags === undefined ? [] : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status
    }
}

// export default connect(mapStateToProps)(CreateEvent);
// export default reduxForm({
//   form: 'CreateLocationForm',  // a unique identifier for this form
// })(CreateLocation)

var CreateLocationValueForm = reduxForm({
  form: 'CreateLocationForm',  // a unique identifier for this form
})(CreateLocation)

const selector = formValueSelector('CreateLocationForm') // <-- same as form name
CreateLocationValueForm = connect(
  locations => {
    return {
      locations
    }
  }
)(CreateLocationValueForm)

export default CreateLocationValueForm