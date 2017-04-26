import React from 'react';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Divider, RaisedButton,
     Dialog, FlatButton, IconButton
    } from 'material-ui';
import {FaPlusCircle, FaTrash} from 'react-icons/lib/fa';
import {setIsCreated, setAddNewAward,
     deleteAward, setEditAward,updateAward, createNewAwardFromEventID, 
      getAwardFromEventID} from '../../reducer/awards/action';

import {setSnackBarMessage} from '../../reducer/dashboard/action';

import ButtonRefresh from '../Utility/ButtonRefresh';

import CreateForm from './DashPageAwards/CreateForm';
import AwardCard from './DashPageAwards/AwardCard';
import EVTable from '../Utility/GridList';

var datefomart = require('dateformat');

const CreateAwardAward = ({event_id}) => ({

    getContentPage() {

        const data = store.getState().awards.data;
        const award = store.getState().awards.award;
        const event = store.getState().events.showEvent;
        const awardData = data;
        
        if (award !== null) {

            return (<div> 
                <CreateForm></CreateForm>
                <Divider></Divider>
                <div style={{
                    ...styles.divHorizontal,
                    'float': 'right'
                }}>
                    <RaisedButton
                        label="Cập nhật"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={() => {
                            if (!checkUpdatable(award)) {
                                store.dispatch(setSnackBarMessage("Vui lòng thay đổi dữ liệu",2000));
                                return;
                            }
                            var awardUpdate = store.getState().form.CreateAwardForm.values;                            
                            awardUpdate = mapFormValuesToAward(awardUpdate);
                            awardUpdate._id = award._id;
                            awardUpdate.award_id = award._id;
                            store.dispatch(updateAward(awardUpdate,event._id))
                        }}
                        style={styles.buttonMargin}
                        
                    />
                    <RaisedButton
                        label="Xoá"
                        secondary={true}
                        onTouchTap={() => {
                            store.dispatch(deleteAward(award,event._id));
                        }}
                        style={styles.buttonMargin}
                    />
                    <FlatButton
                    label="Trở lại"
                    primary={true}
                    onTouchTap={this.handleCloseCreate}
                    style={styles.buttonMargin}
                    />,
                </div>
            </div>)
        }

        return (
            <div>
                <div className="event-task-header">
                    <RaisedButton 
                        label="Thêm phần thưởng"
                        primary={true}
                        icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        onTouchTap={() => {
                            store.dispatch(createNewAwardFromEventID(event_id));
                        }}
                    />
                    <ButtonRefresh onTouchTap={() => {
                        store.dispatch(getAwardFromEventID(event_id));
                    }}/>
                </div>
                <Divider style={{
                    marginTop: 10,
                    marginBottom: 10
                }}/>
                <div className="event-award-list">
                    <EVTable {...awardData.map( (award, index) => 
                         <AwardCard {...award}
                            detailTouchTap={() => {
                                store.dispatch(setEditAward(award))
                            }}
                            deleteTouchTap={() => {
                                store.dispatch(deleteAward(award,event._id));
                            }}
                         />   
                    )} isFullWidth={true}/>
                </div>
            </div>
        );
    },

    render() {
        const content = this.getContentPage();
        return (
            content   
        )
    },
    
    handleCloseCreate() {
        store.dispatch(setEditAward(null));
    },

    componentWillMount() {
        store.dispatch(getAwardFromEventID(event_id));
    }

});

const mapStateToProps = ({awards}) => ({
    awards
});

function checkUpdatable(award) {
    const form = store.getState().form.CreateAwardForm;
    if (form === null || form  === undefined) {
        return false;
    }
    const values = form.values;
    return (
        award.name !== values.name ||
        award.detail !== values.detail ||
        award.image_url !== values.image_url ||
        award.contact !== values.contact || 
        award.award_type !== values.award_type || 
        // award.item_id !== values.item_id ||  
        award.tags.join() !== values.tags 
    )
}

function mapFormValuesToAward(values) {
    if (!values || values === undefined) {
        return {};
    }

    return {
        name: values.name === undefined ? "" : values.name,
        detail: values.detail === undefined ? "" : values.detail,
        priority: values.priority === undefined ? 7 : values.priority,
        image_url: values.image_url === undefined ? "" : values.image_url,
        contact: values.contact === undefined ? "" : values.contact,
        award_type: values.award_type === undefined ? "" : values.award_type,
        item_id: values.item_id === undefined ? "" : values.item_id,
        tags: values.tags === undefined ? [] : values.tags.split(",").map(value => {
            return value.trim()
        }),
        status: values.status === undefined ? "" : values.status
    }
}

export default connect(mapStateToProps)(CreateAwardAward);

