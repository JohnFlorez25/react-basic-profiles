import React from 'react';

import './styles/ProfileNewStyle.css'
import Profile from '../components/Profile';
import ProfileForm from '../components/ProfileForm';
import PageLoading from '../components/PageLoading';
import axios from 'axios';
class ProfileNew extends React.Component {

    state = { 
        loading: false,
        error: null,
        form: {
        firstName: '',
        lastName: '',
        email:'',
        jobTitle:'',
        twitter:'',
    }};

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5700/profiles', this.state.form)
        .then(profile => this.setState({
            loading: false,
            }),
        )
        .catch(error => {
            this.setState({
                loading: false,
                error: error,
            })
        })
    };

    render(){

        if (this.state.loading) {
            return <PageLoading />;
        }

        return (
            <React.Fragment>
                <div className="ProfileNew__hero">
                    <span className="ProfileNew__hero-text">
                        "Bienvenido a la conferencia Geek! ,
                        esperamos todas nuestras charlas sean de tu total interes"
                    </span>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 ">
                            <Profile    
                                    firstName = {this.state.form.firstName || 'NOMBRES'}
                                    lastName = {this.state.form.lastName || 'APELLIDOS'} 
                                    jobTitle = {this.state.form.jobTitle || 'CARGO'} 
                                    twitter = {this.state.form.twitter || 'twitter'}
                                    email = {this.state.form.email || 'EMAIL'} 
                                    avatarUrl = "https://www.gravatar.com/avatar/92ed193e586ae770218d6d3cad745d4f?d=identicon"
                                />
                        </div>
                        <div className="col-6">
                            <h1>Nuevo Asistente</h1>
                            <ProfileForm 
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                formValues =  {this.state.form}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProfileNew;