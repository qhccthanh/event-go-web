import React from 'react';
import {store} from '../../storeConfigure';
import {getSupplier, setExpandInfo} from '../../reducer/supplier/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import {FaPencil}  from 'react-icons/lib/fa';
import InfoPage from './InfoPage';
import EditPage from './EditPage';
import {Paper, TextField,Toggle} from 'material-ui';
import styles from '../stylesScript';

const Dashboard = (states,actions) => ({
    
  render() {
    const contentPage = store.getState().supplier.isEditInfo ? <EditPage></EditPage> : <InfoPage></InfoPage>;
    return (
      <div  className="col-xs-12">
        <Paper style={styles.pageStyle} zDepth={2} className="col-xs-12">
            {contentPage}
        </Paper>
      </div>
    )
  }
});

const mapStateToProps = ({supplier}) => ({
    supplier
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getSupplier());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
