import React from 'react';

import {FaCalendarTimesO} from 'react-icons/lib/fa'; 

const dataFake = [
    {
        title: "title",
        subTitle: "subTitle",
        icon: <FaCalendarTimesO></FaCalendarTimesO>,
        startTime: "14/03/1995",
        endTime: "14/03/1995",
    },
]

for (var index = 0; index < 12; index++) {
    dataFake.push(dataFake[0]);
}

const EVTable = ({isFullWidth}) => ({
    render() {
        
        var items = this.props;
        const allKeys = Object.keys(items);
        var elements = [];
        allKeys.forEach(function(key) {
            elements.push(items[key]);
        }, this);
        var rowClass = "col-xs-12 col-md-6 col-lg-4 card-event-item";
        if (isFullWidth !== undefined && isFullWidth === true) {
            rowClass = "col-xs-12 card-event-item";
        }
        
        return (
            <div className="col-xs-12">
                {/*{dataFake.map(function(data) {
                    return <div className="col-xs-12 col-md-6 col-lg-4 card-event-item" 
                            children={children}
                    >
                        
                    </div>
                })}*/}
                { 
                    elements.map((element,index) => {
                        return (
                            <div key={index}
                                className={rowClass}>
                                {element}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
  
});

export default EVTable;