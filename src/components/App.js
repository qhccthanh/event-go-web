import React from 'react';
import '../styles/App.css';
import { Route } from 'react-router-dom';
import DashboardHeader from './DashboardPage/DashboardHeader'
import DashLeftNavigation from './DashboardPage/DashLeftNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux';
import {history} from '../storeConfigure';

import Supplier from './DashPageSupplier';
import Events from './DashPageEvents';
import Images from './DashPageImages';
// import Awards from './DashPageAwards';
// import Tasks from './DashPageTasks';
import Notifications from './DashPageNotifications';
import Items from './DashPageItems';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Locations from './DashPageLocations';
import muiTheme from '../styles/theme-material';

import {Snackbar} from 'material-ui';
import {connect} from 'react-redux';
import {store} from '../storeConfigure';
import {checkSignIn} from '../reducer/authentication/action';

const routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => <Supplier/>,
        main: () => <h2>Home</h2>
    },
    {
        path: '/events',
        sidebar: () => <Events/>,
        main: () => <h2>Bubblegum</h2>
    },
    // {
    //     path: '/tasks',
    //     sidebar: () => <Tasks/>,
    //     main: () => <h2>Shoelaces</h2>
    // },
    {
        path: '/notifications',
        sidebar: () => <Notifications/>,
        main: () => <h2>Shoelaces</h2>
    },
    // {
    //     path: '/awards',
    //     sidebar: () => <Awards/>,
    //     main: () => <h2>Shoelaces</h2>
    // },
    {
        path: '/locations',
        sidebar: () => <Locations/>,
        main: () => <h2>Shoelaces</h2>
    },
    {
        path: '/items',
        sidebar: () => <Items/>,
        main: () => <h2>Shoelaces</h2>
    },
    {
        path: '/resources',
        sidebar: () => <Images/>,
        main: () => <h2>Shoelaces</h2>
    },
];

const App = () => ({

    render() {
        store.dispatch(checkSignIn());
        const routeApp = routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                />
        ));
        var snackBar = store.getState().dashboard.snackBar;
        if (snackBar !== null && snackBar !== undefined) {
            snackBar = <Snackbar
                    open={true}
                    message={snackBar.message}
                    autoHideDuration={snackBar.autoHideDuration}
                    />;
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <div>
                    <DashboardHeader/>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
                            <DashLeftNavigation />
                        </div>
                        <div className="col-xs-12">
                            <ConnectedRouter history={history}>
                                <div>
                                    {routeApp}
                                    {snackBar}
                                </div>
                            </ConnectedRouter>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
});
const mapStateToProps = ({dashboard}) => ({
    dashboard
});
export default connect(mapStateToProps)(App);
