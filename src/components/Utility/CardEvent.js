import React from 'react';
import {Card, CardMedia, CardTitle, CardText, Chip, Avatar, RaisedButton} from 'material-ui';
// import FlatButton from 'material-ui/FlatButton';
import styles from '../stylesScript';
import {FaCalendarTimesO, FaCalendarO, FaCalendar, FaChevronLeft} from 'react-icons/lib/fa'; 
import {store} from '../../storeConfigure';
import {setIsCreated, setHideShowDetailEvent} from '../../reducer/events/action';

const CardEvent = () => (
  <Card>
    <CardMedia
      overlay={<CardTitle title="CircleK Việt Nam" subtitle="Sự kiện sinh nhật" />}
    >
      <img src="https://www.circlek.com/sites/all/themes/circlek_new/images/logo_circlek_large.svg" alt="h"/>
    </CardMedia>
    <CardTitle title="Khuyến mãi từng bừng cùng CircleK" subtitle="Mừng 20 năm thành lập cùng nhiều phần quà hấp dẫn cùng CircleK. Tham gia để được nhiều quà tặng nhất" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <br/>
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardText>
        <Chip style={styles.stylesChip.chip}>
            <Avatar icon={<FaCalendarO></FaCalendarO>} />
            Bắt đầu: 14/03/2017
        </Chip>
        <Chip style={styles.stylesChip.chip}>
            <Avatar icon={<FaCalendarTimesO></FaCalendarTimesO>} />
            Kết thúc: 14/03/2017
        </Chip>
        <Chip style={styles.stylesChip.chip}>
            <Avatar icon={<FaCalendar></FaCalendar>} />
            Khởi tạo: 14/03/2017
        </Chip>
    </CardText>
     <RaisedButton 
                    label="Trở về"
                    secondary={true}
                    icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                    onTouchTap={() => {
                        store.dispatch(setIsCreated())
                        store.dispatch(setHideShowDetailEvent())
                    }}
                    style={styles.topButton}
                    />
  </Card>
);

export default CardEvent;