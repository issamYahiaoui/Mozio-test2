import React, {Component} from 'react';

import Header from "../../components/common/header";
import ResultPage from "../ResultPage";
import SearchPage from "../SearchPage";
import {Route, Switch} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../redux/store";


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ConnectedRouter history={history}>
                    <>
                        <Switch>
                            <Route exact path="/" render={(routeProps) => (
                                <SearchPage  {...routeProps} />
                            )} />
                            <Route exact path="/result" render={(routeProps) => (
                                <ResultPage  {...routeProps}/>
                            )} />
                        </Switch>
                    </>
                </ConnectedRouter>
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default App
