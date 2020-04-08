import React from 'react';
import axios from 'axios';

import './styles/ProfileEditStyle.css'

import Profile from '../components/Profile';
import ProfileForm from '../components/ProfileForm';
import PageLoading from '../components/PageLoading';

class ProfileEdit extends React.Component {

    state = { 
        loading: true,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email:'',
            jobTitle:'',
            twitter:'',
        },
    };

    componentDidMount(){
        this.fetchData();
    }
    //Capturando la data de nuestra petición
    fetchData = () =>{
        this.setState({ 
            loading: true,
            error: null 
        });

        this.axiosCancelSource = axios.CancelToken.source()
        
        axios.get(`https://api-profiles-ag.now.sh/profiles/${this.props.match.params.id}`,
        { cancelToken: this.axiosCancelSource.token })
        .then(res =>{
            this.setState({
                loading: false,
                form: res.data,
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error,
            })
        })
    }

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
        axios.put(`https://api-profiles-ag.now.sh/profiles/${this.props.match.params.id}`, this.state.form)
        .then(profile => this.setState({
            loading: false,
        }))
        .catch(error => {
            this.setState({
                loading: false,
                error: error,
            })
        })
    };

    componentWillUnmount(){
        this.axiosCancelSource.cancel('Componente desmontado.')
    }

    render(){

        if (this.state.loading) {
            return <PageLoading />;
        }

        return (
            <React.Fragment>
                <div className="ProfileEdit__hero">
                    <span className="ProfileEdit__hero-text">
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
                                    avatarUrl = "https://www.gravatar.com/avatar/e74e87d40e55b9ff9791c78892e55cb7?d=identicon"
                                />
                        </div>
                        <div className="col-6">
                            <h1>Editar Asistente</h1>
                            <ProfileForm 
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                formValues={this.state.form}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProfileEdit;