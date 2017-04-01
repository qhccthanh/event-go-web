import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getEvents} from '../../reducer/events/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import {FaPlusCircle}  from 'react-icons/lib/fa';
import styles from '../stylesScript';

import {Paper, RaisedButton} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';
import CardEvent from '../Utility/CardEvent';

const Dashboard = (states,actions) => ({

  render() {
    return (
      <div  className="col-xs-12">
        <Paper style={styles.pageStyle} zDepth={2} className="col-xs-12">
            <div className="header-content">
              <RaisedButton 
                    label="Tạo mới"
                    primary={true}
                    icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                    onTouchTap={() => {
                        store.dispatch()
                    }}
              />
              <ButtonRefresh onTouchTap={() => {console.log("callsomething")}}/>
            </div>
            <div className="content"> 
              <EVTable></EVTable>
              <CardEvent></CardEvent>
            </div>
        </Paper>
      </div>
    )
  }
});

const mapStateToProps = ({events}) => ({
    events
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getEvents());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
