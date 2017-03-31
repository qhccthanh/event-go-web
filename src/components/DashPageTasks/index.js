import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getTasks} from '../../reducer/tasks/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';


const Dashboard = (states,actions) => ({

  render() {
    return (
      <div>
        {states.data}
        tasks
      </div>
    )
  }
});

const mapStateToProps = ({tasks}) => ({
    tasks
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getTasks());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
