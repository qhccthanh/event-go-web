/**
 * Created by thanhqhc on 3/29/17.
 */
import React from 'react';
import '../../styles/dashboard.css';
import '../../styles/styles.css';
import {AppBar, IconButton, MenuItem,IconMenu, RaisedButton} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
// import EventGoIcon from '../../images/EventGo-Logo-48.png';
import {store} from '../../storeConfigure';
import {setShowMenu} from '../../reducer/dashboard/action';
import {connect} from 'react-redux';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {signOut, checkSignIn} from '../../reducer/authentication/action';
import {FaSignIn} from 'react-icons/lib/fa';

// import EventGoIconSVG from '../../logo.svg';
const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    iconStyle={{ fill: 'rgb(255, 255, 255)' }}
  >
    <MenuItem primaryText="Trợ giúp" />
    <MenuItem primaryText="Đăng xuất" 
        onTouchTap={() => {
            store.dispatch(signOut());
        }}
    />
  </IconMenu>
);

const Login = () => (
    <RaisedButton
      label="Đăng nhập"
      icon={<FaSignIn size={24}/>}
      style={{
          marginTop: 5
      }}
      onTouchTap={() => {
            store.dispatch(checkSignIn());
      }}
    />
);

const DashboardHeader = () => ({

    render() {
        const authentication = store.getState().authentication;
        const isLogin = authentication.access_token !== "" && authentication.supplier_id !== "";
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
                    iconElementRight={isLogin ? <Logged /> : <Login/>}
                />
            </div>
        );
    }
});

function mapStateToProps(authentication) {
    return {
        authentication
    }
}

export default connect(mapStateToProps)(DashboardHeader);
