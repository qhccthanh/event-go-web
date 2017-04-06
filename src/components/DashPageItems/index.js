import React from 'react';
import {store} from '../../storeConfigure';
import {getItems, setIsCreated, setShowItem} from '../../reducer/items/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

import CreateItem from './CreateItem';
import ItemCard from './ItemCard';
import ItemInfo from './ItemInfo';

import {Paper, RaisedButton, Divider, Avatar} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle}  from 'react-icons/lib/fa';

const Dashboard = (states,actions) => ({

    getContentPage() {
        let itemsStore = store.getState().items;
        const items = itemsStore.data;
        const itemCards =  items.map(item => {
                                return (
                                <ItemCard 
                                    itemTitle={item.name} 
                                    itemSubtitle={item.detail}
                                    itemAvatar={<Avatar src={item.image_url}></Avatar>}
                                    onTouchTap={() => {
                                        store.dispatch(setShowItem(item));
                                    }}
                                    />);
                            });
        
        if (itemsStore.isCreated === false && itemsStore.item === null) {
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
                    store.dispatch(getItems())
                    }}/>
                </div>
                <div className="content-events"> 
                <div>
                    <EVTable {...itemCards}>
                        
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
        if (itemsStore.isCreated) {
        return <CreateItem/>
        }

        // Show detail event
        if (itemsStore.item) {
        return <ItemInfo/>
        }
    },

    componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getItems())
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
