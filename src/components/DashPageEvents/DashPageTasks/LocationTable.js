import React from 'react';
import {store} from '../../../storeConfigure';
import {connect} from 'react-redux';

import '../../../styles/App.css';
import '../../../styles/styles.css';
import styles from '../../stylesScript';

import {Table, TableHeader,TableRow, TableBody,
      TableHeaderColumn, TableRowColumn, Toggle
    } from 'material-ui';

import {getLocations, setSelectsLoactionTask} from '../../../reducer/locations/action';
var datefomart = require('dateformat');

const LocationTable = () =>  ({

    componentWillMount() {
        store.dispatch(getLocations());
        store.dispatch(setSelectsLoactionTask('none'));
    }, 

    render() {
        const tableStyle = styles.taskListTable.table;
        const tableHeaderStyle = styles.taskListTable.tableHeader;
        const tableBodyStyle = styles.taskListTable.tableBody;
        const locations = store.getState().locations.data;

        return (
            <div>
                <div>
                    <Toggle
                        label="Thực hiện theo thứ tự: "
                        style={styles.toggle}
                    />
                </div>
                <Table 
                fixedHeader={true}
                fixedFooter={tableStyle.fixedFooter}
                selectable={true}
                multiSelectable={true}
                onRowSelection={(value) => {
                    console.log(store.getState().locations.selectValues);
                    store.dispatch(setSelectsLoactionTask(value));
                }}
                >
                    <TableHeader
                        displaySelectAll={true}
                        adjustForCheckbox={true}
                        enableSelectAll={true}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" tooltip="" style={{textAlign: 'center', fontSize: 22}}>
                                Danh sách nhiệm vụ của sự kiện
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="Tên">Tên</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Chi tiết">Chi tiết</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Khởi tạo">Khởi tạo</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                        <TableBody
                            displayRowCheckbox={true}
                            deselectOnClickaway={true}
                            showRowHover={false}
                            stripedRows={false}
                        >
                            {locations.map( (location, index) => (
                                <TableRow
                                    key={index}
                                    selected={false}
                                    onTouchTap={() => {
                                    {/*store.dispatch(setEditTask(task));*/}
                                    }}
                                    >
                                    <TableRowColumn style={styles.taskListTable.tableRow}>
                                        {location.name}
                                    </TableRowColumn>
                                    <TableRowColumn   style={styles.taskListTable.tableRow}>
                                        {location.detail}
                                    </TableRowColumn>
                                    <TableRowColumn  style={styles.taskListTable.tableRow}>
                                        {datefomart(location.created_date,'dd/mm/yy')}
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </div>
        )
    }
})

const mapStateToProps = ({locations}) => ({
    locations
});

export default connect(mapStateToProps)(LocationTable);