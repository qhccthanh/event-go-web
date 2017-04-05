import React from 'react';
import {store} from '../../storeConfigure';
import {getLocations, setIsCreated} from '../../reducer/locations/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import CreateLocation from './CreateLocation';
import LocationCard from './LocationCard';

import {Paper, RaisedButton, Divider} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle, FaPlus}  from 'react-icons/lib/fa';


const Dashboard = (states,actions) => ({

  getContentPage() {

        let locationsStore = store.getState().locations;
        if (locationsStore.isCreated === false && locationsStore.location === null) {
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
                    <EVTable>
                        <LocationCard 
                            itemTitle="Nguyễn Văn Cừ CricleK" 
                            itemSubtitle="229 Nguyễn Văn Cừ Q5"
                            itemAvatar={<FaPlus size={40}></FaPlus>}></LocationCard>
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
        if (locationsStore.isCreated) {
        return <CreateLocation/>
        }

        // Show detail event
        if (locationsStore.item) {
        return <LocationCard/>
        }
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

const mapStateToProps = ({locations}) => ({
    locations
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getLocations());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
