import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setRuntimeVariable} from "../../redux/actions";

class ResultPage extends Component {
    render() {

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
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
