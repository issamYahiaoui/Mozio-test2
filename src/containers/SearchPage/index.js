import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {setRuntimeVariable} from "../../redux/actions";
import  '../style.css'
import SearchInput from "../../components/SearchInput";
class SearchPage extends Component {



    onChange = (e)=>{

        this.props.onChange({
            name : e.target.name ,
            value : e.target.value
        })

    }

    onSubmit=(e)=>{
        //TODO : do some validation on inputs
        console.log('on submit')
        e.preventDefault()
        this.props.history.push('/search')
    }

    handleChange = (name,address) => {
        this.props.onChange({
            name : name ,
            value : address
        })
    };

    handleSelect = (name,address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {



        return (
            <div className="container">
                <form >
                    <div className={"autocomplete-container"}>
                        <div>
                            <label>Start Point</label>
                            {/*<input onChange={this.onChange} name="startPoint" type="text"/>*/}
                            <SearchInput
                                name={"startPoint"}
                                address={this.props.startPoint}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect()}
                            />
                        </div>
                        <div>
                            <label >End Point</label>
                            <input onChange={this.onChange} name="endPoint" type="text"/>
                        </div>
                    </div>
                    <div >
                        <div>
                            <label >Date</label>
                            <input onChange={this.onChange} name="date" type="date"/>
                        </div>
                        <div>
                            <label > Passengers Number</label>
                            <input onChange={this.onChange} name="passengersNb" type="text"/>
                        </div>
                    </div>


                    <div className="btn-submit">
                        <button  onClick={this.onSubmit}  >
                            Submit
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
