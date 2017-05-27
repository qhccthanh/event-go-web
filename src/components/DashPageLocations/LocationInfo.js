import React from 'react';
import {store} from '../../storeConfigure';
import {setIsCreated, createLocation, getSearchAddress, setHiddenLocation, setIsEdit, updateLocation, deleteLocation} from '../../reducer/locations/action';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { RaisedButton, MenuItem, CardHeader, Snackbar } from 'material-ui';
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import {renderTextField, renderSelectField} from '../Utility/ReduxField';

import {FaChevronLeft, FaPencil, FaBan, FaFloppyO, FaTrash, FaSearch}  from 'react-icons/lib/fa';
import {connect} from 'react-redux';

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

const LocationItem = (props) => ({
    
    render() {
        const location = store.getState().locations.location;
        const isEdit = store.getState().locations.isEdit;
        const needRemoveWarnState = (store.getState().form.InfoLocationForm === undefined || store.getState().form.InfoLocationForm.values === undefined);

        const errorSearch = store.getState().locations.errorSearch;
        const searchData = location.location_info;
        const markers =  searchData === null ? [] : [
            {
                position: searchData.coordinate,
                key: searchData.formatted_address,
                defaultAnimation: 2,
            }
        ]

        if (!isEdit){
            store.dispatch(change('InfoLocationForm','name',location.name));
            store.dispatch(change('InfoLocationForm','detail',location.detail));
            store.dispatch(change('InfoLocationForm','address',location.address));
            store.dispatch(change('InfoLocationForm','image_url',location.image_url));
            store.dispatch(change('InfoLocationForm','tags',location.tags.join()));
            if (location.links !== undefined || typeof(location.links) === 'Array') {
                store.dispatch(change('InfoLocationForm','links',location.links.join()));
            } else {
                store.dispatch(change('InfoLocationForm','links',""));
            }
            
            store.dispatch(change('InfoLocationForm','status',location.status));
        } else if (needRemoveWarnState) {
            store.dispatch(setHiddenLocation());
            store.dispatch(setIsEdit(false));
            return <div></div>
        }

        const locationUpdate = store.getState().form.InfoLocationForm.values;
        const isEnableSaveButton = !(locationUpdate.name !== location.name || locationUpdate.detail !== location.detail || locationUpdate.image_url !== location.image_url || locationUpdate.status !== location.status || locationUpdate.tags !== location.tags.join())

        return (
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <div className="header-content">
                        <RaisedButton 
                            label="Trở về"
                            secondary={true}
                            icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                            onTouchTap={() => {
                                store.dispatch(setHiddenLocation())
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
                                    var locationUpdate = store.getState().form.InfoLocationForm.values;
                                    console.log(locationUpdate);
                                    locationUpdate = mapFormValuesToItem(locationUpdate);
                                    locationUpdate.location_id = location._id;
                                    
                                    store.dispatch(updateLocation(locationUpdate))
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
                                    store.dispatch(deleteLocation(location))
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
                        label="Tên vị trí"
                        name="name"
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        label="Chi tiết"
                        name="detail"
                        component={renderTextField}
                        disabled={!isEdit}
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
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
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText="Ảnh đại diện của địa điểm (nếu có)"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        multiLine={true}
                        name="image_url"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText='Tags sự kiện (Ex: ""an uong", "nghi ngoi")'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
                        name="tags"
                        component={renderTextField}
                        disabled={!isEdit}
                    />
                    <Field
                        floatingLabelText='Trạng thái'
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        fullWidth={true}
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
                                {store.dispatch(createLocation(
                                    mapFormValuesToItem(store.getState().form.InfoLocationForm.values)
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
    const searchData = store.getState().locations.location.location_info;
    return {
        name: values.name,
        detail: values.detail,
        address: values.address,
        links: values.link === undefined ? [] : values.link.split(",").map(value => {
            return value.trim()
        }),
        image_url: values.image_url,
        location_info: searchData,
        tags: values.tags === undefined ? "" : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status
    }
}

// export default connect(mapStateToProps)(CreateEvent);
var InfoLocationValueForm = reduxForm({
  form: 'InfoLocationForm',  // a unique identifier for this form
})(LocationItem)

const selector = formValueSelector('InfoLocationForm') // <-- same as form name
InfoLocationValueForm = connect(
  locations => {
    return {
      locations
    }
  }
)(InfoLocationValueForm)

export default InfoLocationValueForm