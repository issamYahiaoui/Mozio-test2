import React, {Component} from 'react';
import {DirectionsRenderer, GoogleMap, Marker} from "react-google-maps";




export default class ResultMap extends Component {



    render() {

        const {google,directions} =this.props
        return(
         <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        )
    }
}
