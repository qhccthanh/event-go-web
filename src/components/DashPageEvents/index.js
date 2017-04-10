import React from 'react';
import {store} from '../../storeConfigure';
import {getEvents, setIsCreated} from '../../reducer/events/action';
import {connect}  from 'react-redux';
// import {push} from 'react-router-redux';


import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {FaPlusCircle}  from 'react-icons/lib/fa';

import {Paper, RaisedButton, Divider} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';
import CardEvent from '../Utility/CardEvent';
import CreateEvent from './CreateEvent';
import EventCard from './EventCard';
import EventInfo from './EventInfo';

const Dashboard = (states,actions) => ({

  getContentPage() {
    let eventStore = store.getState().events;
    if (eventStore.isCreated === false && eventStore.showEvent === null) {
      const events = eventStore.data;
      const eventCards = events.map(event => {
        return (
          <EventCard {...event}>

          </EventCard> 
        );
      })
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
                <EVTable {...eventCards}>
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
    if (eventStore.isCreated) {
       return <CreateEvent/>
    }

    // Show detail event
    if (eventStore.showEvent) {
      return <EventInfo/>
    }
  },

  render() {
    let contentHTML = this.getContentPage();
    return (
      <div  className="col-xs-12">
        <Paper style={styles.pageStyle} zDepth={styles.pageStyle.zDepth} className="col-xs-12">
            {contentHTML}
        </Paper>
      </div>
    )
  },

  componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getEvents())
    },
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
