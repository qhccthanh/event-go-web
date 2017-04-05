import React from 'react';
import {store} from '../../storeConfigure';
import {getNotifications, setIsCreated} from '../../reducer/notifications/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import CreateNotification from './CreateNotification';
import NotificationCard from './NotificationCard';

import {Paper, RaisedButton, Divider} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle, FaBellO}  from 'react-icons/lib/fa';


const Dashboard = (states,actions) => ({

  getContentPage() {

        let notificationsStore = store.getState().notifications;
        if (notificationsStore.isCreated === false && notificationsStore.location === null) {
            return (
            <div key="content-events">
                <div className="header-content">
                <RaisedButton 
                        label="Tạo mới"
                        primary={true}
                        icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated(true))
                        }}
                />
                <ButtonRefresh onTouchTap={() => {console.log("callsomething")}}/>
                </div>
                <div className="content-events"> 
                <div>
                    <EVTable>
                        <NotificationCard 
                            itemTitle="Thống bao cho Event 20 năm" 
                            itemSubtitle="Thông báo thêm phần thưởng cho sự kiện"
                            itemAvatar={<FaBellO size={40}></FaBellO>}></NotificationCard>
                    </EVTable>
                    <br/>
                    <Divider/>
                    <br/>
                </div> 
                </div>
            </div> 
            );
        }

        // Show create view
        if (notificationsStore.isCreated) {
          return <CreateNotification/>
        }

        // Show detail event
        if (notificationsStore.item) {
          return <NotificationCard/>
        }
    },

    render() {
        const htmlContent = this.getContentPage();
        return (
            <Paper style={styles.pageStyle} zDepth={styles.pageStyle.zDepth} className="col-xs-12">
                {htmlContent}
            </Paper>
        )
    }
});

const mapStateToProps = ({notifications}) => ({
    notifications
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getNotifications());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
