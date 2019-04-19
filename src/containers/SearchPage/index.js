import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {fetchDirections, fetchDistance, fetchDistanceDuration, setRuntimeVariable} from "../../redux/actions";
import  '../style.css'
import SearchInput from "../../components/SearchInput";
import Card from "@material-ui/core/es/Card/Card";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Icon from "@material-ui/core/Icon";
import queryString from 'query-string'
import {clean, isBlank} from "../../utils";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({
    card: {
        width: 600,
        padding : 20
    },
    bottomPart : {
        marginTop : 40
    },
    button: {
        margin: theme.spacing.unit,
    },

    rightIcon: {
        marginLeft: theme.spacing.unit,
    },


});
class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = { errors : {
                startPoint: null ,
                endPoint : null ,
                passengersNb : null ,
                date : null ,
            }}
    }

    componentDidMount() {

        const {onChange}= this.props

        //Simulate DeeplLinking
        const values = queryString.parse(this.props.location.search)
        if(values.startPoint) onChange({name:'startPoint',value : values.startPoint})
        if(values.endPoint) onChange({name:'endPoint',value : values.endPoint})
        if(values.date) onChange({name:'date',value : values.date})
        if(values.passengersNb) onChange({name:'passengersNb',value : values.passengersNb})
    }

    onChange = (e)=>{

        this.props.onChange({
            name : e.target.name ,
            value : e.target.value
        })

    }

     onSubmit= async (e)=>{


        console.log('on submit')
        e.preventDefault()
        if(this.props.root.startPoint !== ''   && this.props.root.endPoint !== '' && this.props.root.date !== '' && this.props.root.passengersNb !== ''  ){
            await this.fetchDis()
            this.props.history.push('/result')
        }else{
            // So Ashamed of this , but due to time :(
            if(this.props.root.startPoint === '')  await this.setState({errors : {...this.state.errors,startPoint: "Start Point is required !"}})
            if(this.props.root.endPoint === '')  await this.setState({errors : {...this.state.errors,endPoint: "End Point is required !"}})
            if(this.props.root.date === '')  await this.setState({errors : {...this.state.errors,date: "Date is required !"}})
            if(this.props.root.passengersNb === '')  await this.setState({errors : {...this.state.errors,passengersNb: "Passengers Number is required !"}})
        //
            }

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
                    console.log('latLng', latLng)
                          this.props.onChange({
                              name: name === "startPoint" ? "origins" : "destinations" ,
                              value : {lat : latLng.lat , lng : latLng.lng}
                          })
                })
                .catch(error => console.error('Error', error));
        }catch(e){
            alert(e)
        }

    };

    fetchDis =()=>{



        let that= this
        let service = new this.props.google.maps.DistanceMatrixService();

        this.props.fetchDistanceDuration(
            {
                googleService : service,
                origins : this.props.root.startPoint,
                destinations :this.props.root.endPoint,
                travelMode : this.props.root.travelMode
            }
        )

    }




    render() {

        const { classes } = this.props;



        console.log(this.state)

        return (
            <div className={"container"}>

            <Card className={classes.card}>

                <CardHeader
                title={"Search Destinations"}
                />
                <CardContent>
                    {
                        Object.keys(this.state.errors).map((keyName, i) => (
                            <ListItem  key={i}>
                                <span  className={"errSpan"}> {this.state.errors[keyName]}</span>
                            </ListItem>
                        ))
                    }
                    <form className={""} >


                        <div className={"row"}>
                            <div className={"search-input-container"}>
                                <label>Start Point</label>

                                <SearchInput
                                    name={"startPoint"}
                                    address={this.props.root.startPoint}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                    googleCallbackName="initOne"
                                />
                            </div>

                            <div  className={"search-input-container"} style={{marginLeft : 40}}>
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
                        <div   className={classes.bottomPart} >
                            <label>Date</label>
                            <div className={"column"}>

                                <TextField

                                    type={"date"}
                                    name="date"
                                    value={this.props.root.date}
                                    onChange={this.onChange}
                                    margin="normal"
                                />

                            </div>
                            <div >
                                <TextField

                                    type={"number"}
                                    name="passengersNb"
                                    label="Passengers Number"
                                    value={this.props.root.passengersNb}
                                    onChange={this.onChange}
                                    margin="normal"
                                />
                            </div>
                        </div>
                        <div className="btn-submit">
                            <Button variant="contained" onClick={this.onSubmit} color="primary" className={classes.button}>
                                Send
                                <Icon className={classes.rightIcon}>send</Icon>
                            </Button>

                        </div>
                    </form>
                </CardContent>



            </Card>
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
    fetchDirections: (payload) => {

        dispatch(fetchDirections(payload))
    },
    fetchDistanceDuration: (payload) => {

        dispatch(fetchDistanceDuration(payload))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPage));
