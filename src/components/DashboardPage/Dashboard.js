import React, {Compoment} from 'react';
import DashLeftNavigation from './DashLeftNavigation';
import DashboardHeader from './DashboardHeader';
import {store} from '../../storeConfigure';
import {connect} from 'react-redux';

import {SnackBar} from 'material-ui';

const Dashboard = () => ({
    render() {

        const isShowMenu = store.getState().dashboard.isShowMenu;
        const classDiv = isShowMenu ? {
            leftClassName: "col-sm-2",
            mainClassName: "col-sm-10"
        } : {
            leftClassName: "col-sm-0",
            mainClassName: "col-sm-12"
        }
    
        return (
            <div>
                <DashboardHeader/>
                <div>
                    <div className={classDiv.leftClassName}>
                        <DashLeftNavigation/>
                    </div>
                    <div className={classDiv.mainClassName}>
                    </div>
                </div>
                
            </div>  
        )
    }
});

const mapStateToProps = ({dashboard}) => ({
    dashboard
});

export default connect(mapStateToProps)(Dashboard);