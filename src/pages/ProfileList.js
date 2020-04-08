import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles/ProfileListStyle.css';

import confLogo from '../images/logo-ag-min.png';

import ProfileCard from '../components/ProfileCard';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader.js';

class ProfileList extends React.Component {
    
    constructor(props){
        super(props);
        this.state= {
            loading: true,
            error: null,
            data: undefined,
        }
    }

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
        
        axios.get('https://api-profiles-ag.now.sh/profiles',
        { cancelToken: this.axiosCancelSource.token })
        .then(res =>{
            this.setState({
                loading: false,
                data: res.data,
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error,
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        console.log({
            prevProps: prevProps,
            prevState: prevState
        });
    
        console.log({
            props: this.props,
            state: this.state
        })
    }

    componentWillUnmount(){
        this.axiosCancelSource.cancel('Componente desmontado.')
    }

    render() { 
        
        if(this.state.loading === true && !this.state.data) {
            return <PageLoading />;
        }
        
        if(this.state.error) {
            return <PageError error={this.state.error} />
        }

        return ( 
            <React.Fragment>
                <div className="ProfileList">
                    <div className="ProfileList__hero">
                        <div className="ProfileList__container">
                            <img src={confLogo} alt="Mi logo" />
                        </div>
                    </div>
                </div>
                <div className="ProfileList__container">
                    <div className="ProfileList__buttons">
                        <Link to="profiles/new" className="btn btn-primary">
                            Agregar Perfil
                        </Link>
                    </div>
                    <div>

                    <ProfileCard profiles={this.state.data} />

                    {this.state.loading && <MiniLoader />}
                
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProfileList;