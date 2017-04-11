import React from 'react';
import {store} from '../../storeConfigure';
import {setShowDetailEvent, createEvent} from '../../reducer/events/action';
import {}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import { Tabs, Tab,RaisedButton, CardHeader} from 'material-ui';
import { Field, reduxForm } from 'redux-form'

import {FaChevronLeft}  from 'react-icons/lib/fa';
import CreateForm from './CreateForm';
import CreateEventAward from './CreateEventAward';
import CreateEventTask from './CreateEventTask';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }


const EventInfo = (props) => ({
    
    render() {
        // const {  } = props;
        let eventStore = store.getState().events;
        return (
            
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setShowDetailEvent(null))
                        }}
                    />
                </div>
                <Tabs
                inkBarStyle={{
                    background: 'white',
                    height: 3,
                    marginTop: -6,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 5
                }}>
             >
             
                <Tab label="Thông tin" >
                    <CreateForm></CreateForm>
                </Tab>
                    <Tab
                        label="Nhiệm vụ"
                    >
                        <CreateEventTask event_id={eventStore.showEvent._id}></CreateEventTask>
                    </Tab>
                    <Tab
                        label="Phần thưởng"
                    >
                        <CreateEventAward></CreateEventAward>
                    </Tab>
                </Tabs>
            </div>
        )
    }
})

function mapFormValuesToEvent(values) {
    return {
        name: values.name,
        sub_name: values.sub_name,
        thumbnail_url: values.thumbnail_url,
        cover_url: values.cover_url,
        policy_url: values.policy_url,
        detail_url: values.description,
        start_time: values.start_date.getTime(),
        end_time: values.end_date.getTime(),
        tags: [ values.tags],
        limit_user: values.limit_user
    }
}

// export default connect(mapStateToProps)(CreateEvent);
export default reduxForm({
  form: 'EventInfoForm',  // a unique identifier for this form
})(EventInfo)