import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class ResultPage extends Component {
    render() {
        return (
            <div>
                Result Page
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ResultPage);
