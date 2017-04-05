import React from 'react';
import {store} from '../../storeConfigure';
import {setExpandInfo, setIsEditSupplier} from '../../reducer/supplier/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';
import {FaPencil}  from 'react-icons/lib/fa';
import styles from '../stylesScript';

import {
Card, CardActions, CardHeader, Chip, RaisedButton,
  CardText, FlatButton} from 'material-ui';
import ButtonRefresh from '../Utility/ButtonRefresh';


const InfoPage = (supplier) => ({

    renderChip() {
    const stylesChip = styles.stylesChip;

    const chipData = [
      {key: 0, label: 'Angular'},
      {key: 1, label: 'JQuery'},
      {key: 2, label: 'Polymer'},
      {key: 3, label: 'ReactJS'},
    ]

    return (
        chipData.map(function (data) {
            return (
            <Chip
            key={data.key}
            style={stylesChip.chip} >
            {data.label}
            </Chip>);
        })
        );
    },

    render() {
        const expanded = store.getState().supplier.isExpandInfo;
        const cardStyle = {
            marginTop: 20
        }

        return (
            <div>
                <div className="header-content">
                    <RaisedButton 
                    label="Chỉnh sửa"
                    primary={true}
                    icon={<FaPencil size={styles.headerIconButton.size}></FaPencil>} 
                    onTouchTap={() => {
                        store.dispatch(setIsEditSupplier())
                    }}
                    />
                    <ButtonRefresh onTouchTap={() => {}}/>
                </div>
                <div className="content">
                    <Card expanded={expanded} style={cardStyle}>
                        <CardHeader
                            title="Supplier Name"
                            subtitle="Quản lý"
                            avatar="http://navitelvietnam.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                            actAsExpander={true}
                        />

                        <CardText expandable={true}> Level: 1 </CardText>
                        <CardText expandable={true}> Status: </CardText>
                        <div style={styles.divHorizontal}>
                            {this.renderChip()}
                        </div>
                        <CardActions>
                            <FlatButton label={expanded ? "Thu gọn": "Xem thêm"} onTouchTap={ () => {
                                store.dispatch(setExpandInfo())
                            }}>
                            </FlatButton>
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
});

const mapStateToProps = ({supplier}) => ({
    supplier
});

// const mapDispatchToProps = (dispatch) => ({
//     getData() {
//         return () => {
//             dispatch(getSupplier());
//         };
//     },
// });

export default connect(mapStateToProps)(InfoPage);
