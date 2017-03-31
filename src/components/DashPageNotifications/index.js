import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getNotifications} from '../../reducer/notifications/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';


const Dashboard = (states,actions) => ({

  render() {
    return (
      <div>
        {states.data}
        notifications
      </div>
    )
  }
});

const mapStateToProps = ({notifications}) => ({
    notifications
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getNotifications());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
