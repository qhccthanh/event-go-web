import React from 'react';
import {store} from '../../storeConfigure';
import {getLocations, setIsCreated, setShowLocation} from '../../reducer/locations/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import CreateLocation from './CreateLocation';
import LocationCard from './LocationCard';
import LocationInfo from './LocationInfo';

import {Paper, RaisedButton, Divider, Avatar} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle, FaPlus}  from 'react-icons/lib/fa';


const Dashboard = (states,actions) => ({

  getContentPage() {

        let locationsStore = store.getState().locations;
        const locations = locationsStore.data;
        const locationCards =  locations.map(location => {
                                return (
                                <LocationCard 
                                    itemTitle={location.name} 
                                    itemSubtitle={location.detail}
                                    itemAvatar={<Avatar src={location.image_url}></Avatar>}
                                    onTouchTap={() => {
                                        store.dispatch(setShowLocation(location));
                                    }}
                                    />);
                            });

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
                <ButtonRefresh onTouchTap={() => {
                    store.dispatch(getLocations())
                }}/>
                </div>
                <div className="content-events"> 
                <div>
                    <EVTable {...locationCards}>
                        
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
        if (locationsStore.location) {
            return <LocationInfo/>
        }
    },

    componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getLocations())
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
