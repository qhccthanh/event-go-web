import React, { Component } from 'react';
import UploadPreview from '../UploadFile/UploadPreview';
import {setIsCreated, uploadImages} from '../../reducer/images/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import styles from '../stylesScript';
import { Divider, RaisedButton, CardHeader} from 'material-ui';
import {FaChevronLeft}  from 'react-icons/lib/fa';
import {store} from '../../storeConfigure';

const marginDiv = {
                    marginLeft: 10,
                    marginTop: 8,
                    marginBottom: 8
                }

class CreateImage extends Component {
    constructor() {
        super();
        this.state = {
            pictures: {}
        };
    }
 
    onChange = (pictures) => this.setState({ pictures });
 
    render() {
        return (
            <div>
                <div className="create-event-header" style={Object.assign(marginDiv,styles.floatingLabelStyle)}>
                    <RaisedButton 
                        label="Trở về"
                        secondary={true}
                        icon={<FaChevronLeft size={styles.headerIconButton.size}></FaChevronLeft>} 
                        onTouchTap={() => {
                            store.dispatch(setIsCreated(false))
                        }}
                    />
                    <RaisedButton
                        label="Lưu lại" 
                        primary={true}
                        style={{'float': 'right'}}
                        onTouchTap={
                            () =>  {
                                store.dispatch(uploadImages(this.state.pictures))
                            }
                        }/>
                </div>
                <UploadPreview
                    title="Picture"
                    label="Add"
                    initialItems={this.state.pictures}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const mapStateToProps = ({images}) => ({
    images
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateImage);

