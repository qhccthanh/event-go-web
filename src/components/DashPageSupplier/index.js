import React, {Compoment} from 'react';
import {store} from '../../storeConfigure';
import {getSupplier} from '../../reducer/supplier/action';
import {connect}  from 'react-redux';
import '../../styles/App.css';
import '../../styles/styles.css';

import {Paper, TextField,
Card, CardActions, CardHeader,
 CardMedia, CardTitle,
  CardText, FlatButton, Toggle} from 'material-ui';

const style = {
 
  padding: 10,
  marginTop: 20,
  marginBottom: 20,
  marginRight: 50,
  display: 'block',
};

const Dashboard = (states,actions) => ({

  constructor() {
    
  },

  render() {
    return (
      <div  className="col-xs-12">
        {states.data}
        <Paper style={style} zDepth={2} className="col-xs-12">

            <Card expanded={this.state.expanded}>
              <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="images/ok-128.jpg"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText>
                
              </CardText>
              <CardMedia
                expandable={true}
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img src="images/nature-600-337.jpg" />
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
              </CardActions>
            </Card>

        </Paper>
      </div>
    )
  }
});

const mapStateToProps = ({supplier}) => ({
    supplier
});

const mapDispatchToProps = (dispatch) => ({
    getData() {
        return () => {
            dispatch(getSupplier());
        };
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
