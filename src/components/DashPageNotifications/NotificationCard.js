import React from 'react';
// import {store} from '../../storeConfigure';
import {} from '../../reducer/notifications/action';
// import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';


import '../../styles/App.css';
import '../../styles/styles.css';
// import styles from '../stylesScript';

import {Paper, CardHeader} from 'material-ui';
// import ButtonRefresh from '../Utility/ButtonRefresh';

const NotificationCard = ({itemTitle, itemSubtitle, itemAvatar, onTouchTap}) => ({
    
    render() {
        return (
            <div>
                <Paper zDepth={3}>
                    <CardHeader
                    title={itemTitle}
                    subtitle={itemSubtitle}
                    avatar={itemAvatar}
                    className="event-card-header"
                    onTouchTap={onTouchTap}
                    /> 
                </Paper>
            </div>
        )
    }
})

export default NotificationCard;