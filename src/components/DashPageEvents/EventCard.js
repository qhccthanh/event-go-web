import React from 'react';

import {Paper, RaisedButton, Divider,Chip, CardHeader} from 'material-ui';

import '../../styles/styles.css';
import '../../styles/App.css';

import {FaCalendarTimesO} from 'react-icons/lib/fa'; 
import styles from '../stylesScript';
import {store} from '../../storeConfigure';
import {setShowDetailEvent} from '../../reducer/events/action';

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

const EventCard = ({event}) => ({

    render() {
        return (
            <Paper zDepth={3}>
                <CardHeader
                title="Sinh nhât 20 năm"
                subtitle="Sự kiện"
                avatar={<FaCalendarTimesO size={32}/>}
                className="event-card-header"
                />
                
                <Divider></Divider>
                
                <div className="event-card-content">
                    <div className="div-default-topbottom"> 
                        <div>
                            Đã xem: 10
                        </div>
                        <div>
                            Đang tham gia: 15
                        </div>
                        <div>
                            Đã hoàn tất: 15
                        </div>
                        <div>
                            Đã bỏ cuộc: 20
                        </div>
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
                        store.dispatch(setShowDetailEvent({'asd': 1})) 
                    }}
                    />
                    <RaisedButton label="Xoá" secondary={true} />
                </div>
            </Paper>
        )
    }
})

export default EventCard;