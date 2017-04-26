import React from 'react';
// import {store} from '../../storeConfigure';
// import {} from '../../reducer/items/action';
// import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';
import {store} from '../../../storeConfigure';
import '../../../styles/App.css';
import '../../../styles/styles.css';
import styles from '../../stylesScript';

import {FaInfoCircle, FaTrashO,
      FaCalendarPlusO, FaArrowRight, FaGift}  from 'react-icons/lib/fa';
import {MdInfo} from 'react-icons/lib/md';

import {CardHeader,Card, CardText,CardActions, RaisedButton} from 'material-ui';
var datefomart = require('dateformat');

const awardPriorityName = [
    "Giải đặc biệt", "Giải nhất", "Giải nhì",
     "Giải ba", "Giải tư", "Giải năm",
     "Giải sáu", "Giải khuyến khích", "Giải ấn tượng", "Giải sớm nhất",
      "Giải thưởng"
]

const AwardCard = ({detailTouchTap, deleteTouchTap}) => ({
    
    render() {
        const award = this.props;
        const detailFuncTouch = detailTouchTap === undefined ? () => ({}) : detailTouchTap;
        const deleteFuncTouch = detailTouchTap === undefined ? () => ({}) : deleteTouchTap;
        
        const styleIcon = {
            marginRight: 8,
            marginBottom: 5,
            size: 32,
            color: styles.baseColor
        }
        let priorityName = award.priority < awardPriorityName.count ?
                         awardPriorityName[award.priority] :
                         "Giải thưởng"
        return (
            <div>
                <Card>
                    <CardHeader
                    title={priorityName}
                    subtitle={award.name}
                    avatar={award.image_url === undefined ? <FaGift  size={styles.taskIconButton.size}/> : <img src={award.image_url}/>}
                    className="event-card-header"
                    /> 
                    <CardText>
                        <span>
                            <MdInfo style={styleIcon}/>
                            <b>Mô tả: </b> {award.detail}<br/>
                        </span>
                        <span>
                            <FaArrowRight style={styleIcon}/>
                            <b>Loại: </b> { (award.award_type === undefined || award.award_type.length === 0) ? "Chưa xác định" : award.award_type}<br/>
                        </span>
                        <span>
                            <FaCalendarPlusO style={styleIcon}/>
                            <b>Ngày tạo: </b> {datefomart(award.created_date,'dd/mm/yyyy')}<br/>
                        </span>
                    </CardText>
                    <CardActions>
                        <RaisedButton 
                        primary={true}
                        keyboardFocused={true}
                        icon={<FaInfoCircle size={20}/>} 
                        onTouchTap={detailFuncTouch}
                        label="Xem thêm" 
                        />
                        <RaisedButton 
                        secondary={true}
                        icon={<FaTrashO size={20}/>} 
                        onTouchTap={deleteFuncTouch}
                        label="Xoá"
                        />
                    </CardActions>

                </Card>
            </div>
        )
    }
})

export default AwardCard;