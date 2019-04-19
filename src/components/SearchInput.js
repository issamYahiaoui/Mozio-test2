import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import ReactGoogleMapLoader from "react-google-maps-loader"
import './style.css'
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Divider from "@material-ui/core/Divider";
class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        console.log('address',address)
        this.props.onChange(this.props.name,address)
    };

    handleSelect = address => {
        this.props.onSelect(this.props.name,address)
    };

    render() {
        return (
            <ReactGoogleMapLoader
                params={{
                    key: "AIzaSyDdfGGp_xZc9P1kGN3e8UAcIBHHNuJ4IWc",
                    libraries: "places,geometry",
                }}
                render={(googleMaps, error) =>
                    googleMaps ? (
                        <PlacesAutocomplete
                            value={this.props.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
                            {
                                //TODO : merge sugestions from google with suggestions from database
                                return (
                                    <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input form-control input',
                                        })}
                                    />
                                    <List className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div>
                                                    <ListItem
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </ListItem>
                                                    <Divider light />
                                                </div>


                                            );
                                        })}
                                    </List>
                                </div>
                                )
                            }


                            }
                        </PlacesAutocomplete>
                    )   :   (
                        <div>
                            {/*Check for network error so loading state ends if user lost connection.*/}
                            {error === "Network Error" ? <p>{error}</p> : <p>isLoading...</p>}
                        </div>
                    )
                }/>



        );
    }
}

export default SearchInput;
