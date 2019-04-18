import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {fetchDistance, setRuntimeVariable} from "../../redux/actions";
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
        this.props.onChange({
            name : name ,
            value : address
        })
        console.log('my name ...', name)
        try{
            geocodeByAddress(address)
                .then(results => getLatLng(results[0]))
                .then(latLng => {

                })
                .catch(error => console.error('Error', error));
        }catch(e){
            alert(e)
        }

    };



    render() {

        console.log(this.props.startPoint)

        return (
            <div className="container">
                <form className={"column"} >
                    <div className={"row"}>
                        <div>
                            <label>Start Point</label>

                            <SearchInput
                                name={"startPoint"}
                                address={this.props.root.startPoint}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                googleCallbackName="initOne"
                            />
                        </div>

                        <div >
                            <label >End Point</label>
                            <SearchInput
                                name={"endPoint"}
                                address={this.props.root.endPoint}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                googleCallbackName="initOne"
                            />
                        </div>
                    </div>
                    <div   className={"row"} >
                        <div >
                            <label >Date</label>
                            <input onChange={this.onChange} name="date" type="date"/>
                        </div>
                        <div >
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
