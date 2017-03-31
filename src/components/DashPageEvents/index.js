import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getEvents} from '../../reducer/events/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';


const Dashboard = (states,actions) => ({

  render() {
    return (
      <div>
        {states.data}
        events
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
