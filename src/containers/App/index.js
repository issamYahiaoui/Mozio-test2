import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from "../../components/common/header";
import ResultPage from "../ResultPage";
import SearchPage from "../SearchPage";
import {Route, Switch} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../redux/store";
import Footer from "../../components/common/footer";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ConnectedRouter history={history}>
                    <> { /* your usual react-router v4 routing */ }
                        <Switch>
                            <Route exact path="/" render={() => (
                                <SearchPage />
                            )} />
                            <Route exact path="/search" render={() => (
                                <ResultPage />
                            )} />
                        </Switch>
                    </>
                </ConnectedRouter>
                <Footer/>
            </div>
        );
    }
}

export default App
