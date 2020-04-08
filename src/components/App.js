import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';

import ProfileHome from '../pages/ProfileHome';
import ProfileList from '../pages/ProfileList';
import ProfileNew from '../pages/ProfileNew';
import ProfileEdit from '../pages/ProfileEdit';
import ProfileDetailContainer from '../pages/ProfileDetailContainer';

import NotFound from '../pages/NotFound';

const App = () => {
    return (
        
        <BrowserRouter>     
            <Layout>
                <Switch>
                    <Route exact path = "/" component={ProfileHome} />
                    <Route exact path="/profiles"  component={ProfileList} />
                    <Route exact path="/profiles/new"  component={ProfileNew} />
                    <Route exact path="/profiles/:id/edit"  component={ProfileEdit} />
                    <Route exact path="/profiles/:id"  component={ProfileDetailContainer} />
                    <Route component={NotFound} /> 
                </Switch> 
            </Layout>          
        </BrowserRouter>
    );
}
export default App;