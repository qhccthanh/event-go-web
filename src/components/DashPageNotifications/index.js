import React from 'react';
import {store} from '../../storeConfigure';
import {getNotifications, setIsCreated, deleteNotification, pushNotification} from '../../reducer/notifications/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import CreateNotification from './CreateNotification';
import NotificationCard from './NotificationCard';

import {Paper, RaisedButton, Divider, Avatar} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle, FaBellO}  from 'react-icons/lib/fa';


const Dashboard = (states,actions) => ({

  getContentPage() {

        let notificationsStore = store.getState().notifications;
        const notificaitons = notificationsStore.data;
        const notificationCards =  notificaitons.map(item => {
            console.log(item);
                                return (
                                <NotificationCard 
                                    itemTitle={item.title} 
                                    itemSubtitle={item.body}
                                    itemAvatar={<FaBellO size={25}></FaBellO>}
                                    pushAction={() => {
                                        store.dispatch(pushNotification(item));
                                    }}
                                    deleteAction={() => {
                                        store.dispatch(deleteNotification(item));
                                    }}
                                    />);
                            });

        if (notificationsStore.isCreated === false && notificationsStore.notification === null) {
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
                    <EVTable {...notificationCards}>
                        
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
    },
    componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getNotifications());
    },
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
