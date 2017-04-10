import React from 'react';
// import {store} from '../../storeConfigure';
import {} from '../../reducer/locations/action';
// import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';


import '../../styles/App.css';
import '../../styles/styles.css';
// import styles from '../stylesScript';

// import {FaPlusCircle}  from 'react-icons/lib/fa';

import {Paper, CardHeader} from 'material-ui';
// import ButtonRefresh from '../Utility/ButtonRefresh';

const LocationCard = ({itemTitle, itemSubtitle, itemAvatar, onTouchTap}) => ({
    
    render() {
        return (
            <div>
                <Paper zDepth={2}>
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

export default LocationCard;