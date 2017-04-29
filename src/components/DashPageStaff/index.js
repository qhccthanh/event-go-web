import React from 'react';
import {store} from '../../storeConfigure';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import {getStaffs, setIsCreated, setShowStaff, setEditStaff, deleteStaff} from '../../reducer/staffs/action';

import CreateStaff from './CreateStaff';
import StaffCard from './StaffCard';
// import LocationInfo from './LocationInfo';

import {Paper, RaisedButton, Divider, Avatar} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle, FaPlus}  from 'react-icons/lib/fa';


const Dashboard = (states,actions) => ({

  getContentPage() {

        let staffsStore = store.getState().staffs;
        const staffs = staffsStore.data;

        if (staffsStore.isCreated === false) {
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
                <ButtonRefresh onTouchTap={() => {
                    store.dispatch(getStaffs())
                }}/>
                </div>
                <div className="content-events"> 
                <div>
                    <EVTable {...staffs.map( (staff, index) => 
                         <StaffCard {...staff}
                            detailTouchTap={() => {
                                store.dispatch(setEditStaff(staff))
                            }}
                            deleteTouchTap={() => {
                                store.dispatch(deleteStaff(staff));
                            }}
                         />   
                    )} isFullWidth={true}/>
                    <br/>
                    <Divider/>
                    <br/>
                </div> 
                </div>
            </div> 
            );
        }

        // Show create view
        if (staffsStore.isCreated) {
        return <CreateStaff/>
        }

        // Show detail event
        if (staffsStore.staff) {
            // return <StaffInfo/>
        }
    },

    componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getStaffs())
    },

    render() {
        const htmlContent = this.getContentPage();
        return (
            <Paper style={styles.pageStyle} zDepth={styles.pageStyle.zDepth} className="col-xs-12">
                {htmlContent}
            </Paper>
        )
    }
});

const mapStateToProps = ({staffs}) => ({
    staffs
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);