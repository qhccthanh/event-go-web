import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getItems} from '../../reducer/items/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';


const Dashboard = (states,actions) => ({

  render() {
    return (
      <div>
        {states.data}
        items
      </div>
    )
  }
});

const mapStateToProps = ({items}) => ({
    items
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getItems());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
