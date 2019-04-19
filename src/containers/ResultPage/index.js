import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDistance, setRuntimeVariable} from "../../redux/actions";
import {GoogleApiWrapper} from "google-maps-react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Divider from "@material-ui/core/es/Divider/Divider";
import {GoogleMap, withGoogleMap,Marker} from "react-google-maps";
import ResultMap from '../../components/ResultMap'

const styles = theme => ({
    card: {
        width: 400,
        padding : 20
    },

    button: {
        margin: theme.spacing.unit,
    },
    resSpan :{
        color : "#2a5ecc" ,
        marginLeft : 10
    }



});
class ResultPage extends Component {





    fetchDis =()=>{


         console.log('fetchDis ...', this.props)
        let that= this
        let service = new this.props.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [this.props.root.startPoint],
                destinations: [this.props.root.endPoint],
                travelMode: 'DRIVING',
            }, (res,status)=>{
                console.log('res of fetch ...' , res )
                console.log('status of fetch ...' , status)
                if(status === 'OK'){
                    that.props.onChange({
                        name : 'distance',
                        value : res.rows[0].elements[0].distance
                    })
                    that.props.onChange({
                        name : 'duration',
                        value : res.rows[0].elements[0].duration
                    })
                }
            });
    }

    componentWillMount() {

        this.fetchDis()
    }

    render() {

        console.log('res props ..',this.props)

        const { classes } = this.props;
        const {startPoint,endPoint,date,passengersNb,distance,duration} = this.props.root
        return (

                <div className="container">
                    <Card className={classes.card}>
                        <CardHeader
                            title={"Search Result"}
                        />
                        <CardContent>
                            <List >
                                <ListItem>
                                    <List>
                                        <ListItem>
                                            Start Point :
                                            <span className={classes.resSpan}>  {startPoint} </span>
                                        </ListItem>
                                        <Divider light />
                                        <ListItem>
                                            End Point :
                                            <span className={classes.resSpan}>{endPoint}</span>
                                        </ListItem>
                                    </List>

                                </ListItem>
                                <Divider light />
                                <ListItem>
                                    <List>
                                        <ListItem>
                                            Date :
                                            <span className={classes.resSpan}>{date.toString()}</span>
                                        </ListItem>
                                        <Divider light />
                                        <ListItem>
                                            Passengers Number :
                                            <span className={classes.resSpan}>{passengersNb}</span>
                                        </ListItem>
                                    </List>

                                </ListItem>
                                <Divider light />


                                <ListItem className="distanceView">
                                    Travel Mode :
                                    <span className={classes.resSpan}> DRIVING </span>

                                </ListItem>
                                <ListItem className="distanceView">
                                    Distance :
                                    <span className={classes.resSpan}> {distance ? distance.text : 'Not FOUND'} </span>

                                </ListItem>
                                <ListItem className="distanceView">
                                    Duration :
                                    <span className={classes.resSpan}> {duration ? duration.text : 'Not FOUND'} </span>

                                </ListItem>

                            </List>


                        </CardContent>

                    </Card>



                     <Card className={classes.card}>
                         <Map
                             google={this.props.google}
                             containerElement={<div style={{ height: `400px` }} />}
                             mapElement={<div style={{ height: `100%` }} />}
                             origins={this.props.root.origins}
                             destinations={this.props.root.destinations}
                         />
                     </Card>


                </div>

        );
    }
}





export  const Map =  withGoogleMap (
    ResultMap
);

const mapStateToProps = (state) => ({
    root : state.root
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (payload) => {
        dispatch(setRuntimeVariable(payload))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey : "AIzaSyDdfGGp_xZc9P1kGN3e8UAcIBHHNuJ4IWc"
})(withStyles(styles)(ResultPage)));
