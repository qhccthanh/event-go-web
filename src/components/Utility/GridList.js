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

const EVTable = ({children}) => ({
    render() {
        
        var items = this.props;
        const allKeys = Object.keys(items);
        var elements = [];
        allKeys.forEach(function(key) {
            elements.push(items[key]);
        }, this);
        
        return (
            <div className="col-xs-12">
                {/*{dataFake.map(function(data) {
                    return <div className="col-xs-12 col-md-6 col-lg-4 card-event-item" 
                            children={children}
                    >
                        
                    </div>
                })}*/}
                { 
                    elements.map((element) => {
                        return (
                            <div className="col-xs-12 col-md-6 col-lg-4 card-event-item">
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