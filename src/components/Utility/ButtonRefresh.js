import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {FaRefresh} from 'react-icons/lib/fa'

export default (props) => ({

    onTouchTap: function () {
        if (typeof props.onTouchTap === 'function'){
            props.onTouchTap();
        }
    },

    render() {
        return (
            <FloatingActionButton style={{
                'float': 'right',
            }} 
            onTouchTap={this.onTouchTap}
            mini={true}
            >
                <FaRefresh size={20}/>
            </FloatingActionButton>
        )
    }
})