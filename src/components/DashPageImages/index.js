import React from 'react';
import {store} from '../../storeConfigure';
import {getImages} from '../../reducer/images/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';

// import Createimages from './Createimages';
// import imagesCard from './imagesCard';
// import imagesInfo from './imagesInfo';

import {CardMedia, Paper, Divider, RaisedButton, CardTitle, Card} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';
import EVTable from '../Utility/GridList';

import {FaPlusCircle}  from 'react-icons/lib/fa';
var dateformat = require('dateformat');

const Dashboard = (states,actions) => ({

    getContentPage() {
        let imagesStore = store.getState().images;
        const imagess = imagesStore.data;
        const imagesCards =  imagess.map(image => {
                                return (
                                    <Card>
                                        <CardMedia
                                            overlay={
                                                <CardTitle
                                                title={image.name}
                                                
                                                subtitle={"Lúc: " + dateformat(image.created_date,'HH:MM dd/mm/yyyy')} />
                                            }
                                        >
                                            <img src={image.image_url}/>
                                        </CardMedia>
                                    </Card>
                                 );
                            });
        
        if (imagesStore.isCreated === false && imagesStore.image === null) {
            return (
            <div key="content-events">
                <div className="header-content">
                <RaisedButton 
                        label="Tạo mới"
                        primary={true}
                        icon={<FaPlusCircle size={styles.headerIconButton.size}></FaPlusCircle>} 
                        onTouchTap={() => {
                            {/*store.dispatch(setIsCreated(true))*/}
                        }}
                />
                <ButtonRefresh onTouchTap={() => {
                    store.dispatch(getImages())
                    }}/>
                </div>
                <div className="content-events"> 
                <div>
                    <EVTable {...imagesCards}>
                        
                    </EVTable>
                    <br/>
                    <Divider/>
                    <br/>
                </div> 
                </div>
            </div> 
            );
        }

        // // Show create view
        // if (imagesStore.isCreated) {
        // return <Createimages/>
        // }

        // // Show detail event
        // if (imagesStore.images) {
        // return <imagesInfo/>
        // } 
    },

    componentWillMount() {
        console.log("call componentWillMount");
         store.dispatch(getImages())
    },

    render() {
        const htmlContent = this.getContentPage();
        let images = store.getState().images.data;
        return (
            <Paper style={styles.pageStyle} zDepth={styles.pageStyle.zDepth} className="col-xs-12">
                {htmlContent}
            </Paper>
        )
    }
});

const mapStateToProps = ({images}) => ({
    images
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getImages());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
