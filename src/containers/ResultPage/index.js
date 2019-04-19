import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDirections, fetchDistance, fetchDistanceDuration, setRuntimeVariable} from "../../redux/actions";
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
import queryString from "query-string";
import CircularProgress from '@material-ui/core/CircularProgress';
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





    async componentDidMount() {
        const {onChange}= this.props
        const values = queryString.parse(this.props.location.search)
        if(values.startPoint) onChange({name:'startPoint',value : values.startPoint})
        if(values.endPoint) onChange({name:'endPoint',value : values.endPoint})
        if(values.date) onChange({name:'date',value : values.date})
        if(values.passengersNb) onChange({name:'passengersNb',value : values.passengersNb})
        if(values.distance) onChange({name:'distance',value : values.distance})
        if(values.duration) onChange({name:'duration',value : values.duration})

        if(this.props.root.origins &&  this.props.root.destinations)   {
            this.fetchDirections()
        }

    }


    fetchDirections =()=>{

        const{origins,destinations} = this.props.root
        const{google} = this.props
        const DirectionsService = new google.maps.DirectionsService();

        this.props.fetchDirections({
            googleService : DirectionsService,
            origin : new google.maps.LatLng(origins.lat, origins.lng),
            destination :new google.maps.LatLng(destinations.lat, destinations.lng),
            travelMode : this.props.root.travelMode
            })

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
                                    {
                                        this.props.root.fetchingDistanceDurationStarted?
                                            <CircularProgress />
                                        :
                                        <span className={classes.resSpan}> {distance ? distance.text : 'Not FOUND'} </span>
                                    }

                                </ListItem>
                                <ListItem className="distanceView">
                                    Duration :
                                    {
                                        this.props.root.fetchingDistanceDurationStarted?
                                            <CircularProgress />
                                            :
                                    <span className={classes.resSpan}> {duration ? duration.text : 'Not FOUND'} </span>
                                    }


                                </ListItem>

                            </List>


                        </CardContent>

                    </Card>



                     <Card style={{margin : 10, textAlign : 'center'}} className={classes.card}>
                         {
                             this.props.root.fetchingDirectionsStarted?
                                 <CircularProgress />
                                 :

                         <Map
                             google={this.props.google}
                             containerElement={<div style={{ height: `400px` }} />}
                             mapElement={<div style={{ height: `100%` }} />}
                             directions={this.props.root.directions}
                             fetchDirections={this.fetchDirections}
                         />
                         }
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
    fetchDirections: (payload) => {

        dispatch(fetchDirections(payload))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResultPage));
