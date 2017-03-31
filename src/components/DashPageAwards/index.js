import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getAwards} from '../../reducer/awards/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';


const Dashboard = (states,actions) => ({

  render() {
    return (
      <div>
        {states.data}
        awards
      </div>
    )
  }
});

const mapStateToProps = ({awards}) => ({
    awards
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getAwards());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
