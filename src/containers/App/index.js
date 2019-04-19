import React, {Component} from 'react';

import Header from "../../components/common/header";
import ResultPage from "../ResultPage";
import SearchPage from "../SearchPage";
import {Route, Switch} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../redux/store";
import {GoogleApiWrapper} from "google-maps-react";



class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ConnectedRouter history={history}>
                    <>
                        <Switch>
                            <Route exact path="/" render={(routeProps) => (
                                <SearchPage google={this.props.google}  {...routeProps} />
                            )} />
                            <Route exact path="/result" render={(routeProps) => (
                                <ResultPage google={this.props.google}  {...routeProps}/>
                            )} />
                        </Switch>
                    </>
                </ConnectedRouter>
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default (GoogleApiWrapper({
    apiKey : "AIzaSyDdfGGp_xZc9P1kGN3e8UAcIBHHNuJ4IWc"
})(App));
