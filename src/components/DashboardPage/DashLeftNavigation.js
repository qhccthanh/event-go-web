import React from 'react';
import '../../styles/dashboard.css'
import '../../styles/styles.css'
import Drawer from 'material-ui/Drawer';
import {MenuItem, Divider,AppBar,IconButton} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {store} from '../../storeConfigure';
import {setShowMenu} from '../../reducer/dashboard/action';
import models from './DashboardMenuModel';
import {connect} from 'react-redux';

injectTapEventPlugin();

const itemsHTML = models.map(function(items) {
    const data = (
        <div key={items.title}>
            <h4 style={{marginLeft: 10}}>{items.title}</h4>
            {
                items.subModels.map(function(item) {
                    return (
                        <div key={item.title}>
                            <Divider/>
                            <MenuItem onTouchTap={item.action}>
                                 {item.icon}
                                <span>{item.title}</span>
                            </MenuItem>
                        </div>
                        );
                })
            }
        </div> 
    )

    return data;
});


const DashLeftNavigation = (dashboard) => ({

    constructor(props) {
        
    },

    render() {
        const isShowMenu = store.getState().dashboard.isShowMenu;
        let widthNav = isShowMenu == true ? 250 : 0;
        return (
            <div style={{width: widthNav}} className="header-dashboard-nav">
                <Drawer width={widthNav} openSecondary={false} open={isShowMenu}>
                    <AppBar title="Event Go" iconElementLeft={
                            <IconButton onClick={ () => {(
                                    store.dispatch(setShowMenu())
                                )}
                            }>
                                <NavigationMenu />
                            </IconButton>
                        } />
                    <br/>
                    {
                        itemsHTML
                    }
                </Drawer>
            </div>
        );
    }
})

const mapStateToProps = ({dashboard}) => ({
    dashboard
});

export default connect(mapStateToProps)(DashLeftNavigation);
