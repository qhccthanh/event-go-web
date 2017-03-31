/**
 * Created by thanhqhc on 3/29/17.
 */
import React from 'react';
import '../../styles/dashboard.css';
import '../../styles/styles.css';
import {AppBar, IconButton} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import EventGoIcon from '../../images/EventGo-Logo-48.png';
import {store} from '../../storeConfigure';
import {setShowMenu} from '../../reducer/dashboard/action';
// import EventGoIconSVG from '../../logo.svg';

const DashboardHeader = () => {
    return (
        <div>
            {/*<div className="navbar-header">*/}
                {/*<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">*/}
                    {/*<span className="icon-bar"></span>*/}
                {/*</button>*/}
                {/*<a className="navbar-brand" href="#">*/}

                {/*</a>*/}
                {/*<a className="navbar-brand app-name-title-header" href="#">Event Go</a>*/}
            {/*</div>*/}
            {/*<div className="collapse navbar-collapse" id="myNavbar">*/}

            {/*</div>*/}
            <AppBar
                title="Event Go"
                iconElementLeft={
                    <IconButton onClick={ () => {(
                            store.dispatch(setShowMenu())
                        )}
                    }>
                        <NavigationMenu />
                    </IconButton>
                }
            />
        </div>
    );
};

export default DashboardHeader;
