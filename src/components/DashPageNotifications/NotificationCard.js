import React from 'react';
// import {store} from '../../storeConfigure';
import {} from '../../reducer/notifications/action';
// import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';


import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {Paper, CardHeader, RaisedButton} from 'material-ui';
// import ButtonRefresh from '../Utility/ButtonRefresh';
import {FaBellO, FaTrash}  from 'react-icons/lib/fa';

const NotificationCard = ({itemTitle, itemSubtitle, itemAvatar, pushAction, deleteAction}) => ({
    
    render() {
        return (
            <div>
                <Paper zDepth={3}>
                    <CardHeader
                    title={itemTitle}
                    subtitle={itemSubtitle}
                    avatar={itemAvatar}
                    className="event-card-header"
                    /> 
                    <RaisedButton 
                        label="Push"
                        primary={true}
                        onTouchTap={pushAction}
                        icon={<FaBellO size={styles.headerIconButton.size}></FaBellO>} 
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 8,
                        }}
                    />
                    <RaisedButton 
                        label="Xoá"
                        secondary={true}
                        onTouchTap={deleteAction}
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            marginLeft: 8,
                        }}
                        icon={<FaTrash size={styles.headerIconButton.size}></FaTrash>} 
                    />
                </Paper>
            </div>
        )
    }
})

export default NotificationCard;