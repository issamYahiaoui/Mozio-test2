import React, {Component} from 'react';
import  {PlacesAutocomplete,
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class SearchInput extends Component {
    handleChange=(address)=>{
        this.props.onChange(this.props.name,address)
    }
    handleSelect= (address)=>{
        this.props.onSelect(this.props.name,address)
    }
    render() {
        return (
            <PlacesAutocomplete
                value={this.props.address}
                onChange={this.props.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
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
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default SearchInput;
