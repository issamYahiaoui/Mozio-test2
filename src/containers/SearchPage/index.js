import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class SearchPage extends Component {
    render() {
        return (
            <div>
                Search Result
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(SearchPage);
