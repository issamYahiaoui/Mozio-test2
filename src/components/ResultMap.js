import React, {Component} from 'react';
import {DirectionsRenderer, GoogleMap, Marker} from "react-google-maps";




export default class ResultMap extends Component {


    state = {
        directions : null
    }

    componentDidMount() {
        const {google,origins,destinations}= this.props
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(origins.lat, origins.lng),
            destination: new google.maps.LatLng(destinations.lat, destinations.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render() {

        const {google} =this.props
        return(

         <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
        >
            {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
        </GoogleMap>
        )
    }
}
