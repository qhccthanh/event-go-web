import React from 'react';

import {Paper, RaisedButton, Divider,Chip, CardHeader, Avatar} from 'material-ui';

import '../../styles/styles.css';
import '../../styles/App.css';

import {FaCalendarTimesO, FaCalendarCheckO, FaCalendarPlusO} from 'react-icons/lib/fa'; 
import styles from '../stylesScript';
import {store} from '../../storeConfigure';
import {setShowDetailEvent, deleteEvent} from '../../reducer/events/action';

var chipsFake = [
    <Chip style={styles.stylesChip.chip}
                              labelColor={'white'}
                              backgroundColor={styles.baseColor}
                        >
                            Sẳn sàng
                        </Chip>,
                        <Chip style={styles.stylesChip.chip}
                              labelColor={'white'}
                              backgroundColor={styles.baseSubColor}
                        >
                            Đang diễn ra
                        </Chip>,
                        <Chip style={styles.stylesChip.chip}
                              labelColor={'white'}
                              backgroundColor={styles.warningColor}
                        >
                            Kết thúc
                        </Chip>,
                        <Chip style={styles.stylesChip.chip}
                              labelColor={'white'}
                              backgroundColor={styles.errorColor}
                        >
                            Từ chối
                        </Chip>

];


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
var dateformat = require('dateformat');
const styleIcon = {
    marginRight: 8,
    marginBottom: 5,
    size: 23
}

const EventCard = () => ({

    render() {
        const event = this.props;
        
        return (
            <Paper zDepth={2}>
                <CardHeader
                title={event.name}
                subtitle={event.sub_name}
                avatar={<Avatar src={event.thumbnail_url}></Avatar>}
                className="event-card-header"
                />
                
                <Divider></Divider>
                
                <div className="event-card-content">
                    <div className="div-default-topbottom">
                        <span>
                            <FaCalendarPlusO style={styleIcon}/>
                            Ngày tạo: {dateformat(event.created_time,'dd/mm/yyyy')}<br/>
                        </span>
                        <span>
                            <FaCalendarCheckO style={styleIcon}/>
                            Bắt đầu: {dateformat(event.start_time,'dd/mm/yyyy')} <br/>
                        </span>
                        <span>
                            <FaCalendarTimesO style={styleIcon}/>
                            Kết thúc: {dateformat(event.end_time,'dd/mm/yyyy')} <br/>
                        </span>
                    </div>
                    <Divider></Divider>
                    <div className="div-default-topbottom">
                        {
                            chipsFake[randomIntFromInterval(0,3)]
                        }
                    </div>    
                </div>
                
                <Divider></Divider>
                
                <div className="event-card-footer">
                    <RaisedButton 
                    label="Xem thêm" 
                    primary={true} 
                    className="event-card-footer-button"
                    onTouchTap={() => {
                        store.dispatch(setShowDetailEvent(event)) 
                    }}
                    />
                    <RaisedButton 
                    label="Thống kê" 
                    secondary={true} 
                    className="event-card-footer-button"
                    onTouchTap={() => {
                        {/*store.dispatch(setShowDetailEvent(event)) */}
                    }}
                    />
                </div>
            </Paper>
        )
    }
})

export default EventCard;