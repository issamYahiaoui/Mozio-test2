import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDistance, setRuntimeVariable} from "../../redux/actions";
import {GoogleApiWrapper} from "google-maps-react";

class ResultPage extends Component {


    fetchDistance = ()=>{
        console.log('fetching distance ...')
        this.props.fetchDistance({
            origins : this.props.root.startPoint ,
            destinations :this.props.root.endPoint
        })

    }

    componentWillMount() {
        this.fetchDistance()
    }

    render() {
        console.log(this.props)

        const {startPoint,endPoint,date,passengersNb,distance} = this.props.root
        return (

                <div className="container">
                    <form >
                        <div>
                            <div>
                                Start Point :
                                <span> {startPoint} </span>
                            </div>
                            <div>
                                End Point :
                                <span>{endPoint}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                Date :
                                <span>{date.toString()}</span>
                            </div>
                            <div>
                                Passengers Number :
                                <span>{passengersNb}</span>
                            </div>
                        </div>


                        <div className="distanceView">
                            Distance is {distance}
                        </div>
                    </form>
                </div>

        );
    }
}


const mapStateToProps = (state) => ({
    root : state.root
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (payload) => {
        dispatch(setRuntimeVariable(payload))
    },
    fetchDistance: (payload) => {
        dispatch(fetchDistance(payload))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey : "AIzaSyBYezs6ze6ZeaU7-tG0Cz-I6_1bd2U8eSc"
})(ResultPage));
