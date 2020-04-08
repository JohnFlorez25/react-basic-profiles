import React, { Component } from "react";
import axios from "axios";
import ProfileDetails from './ProfileDetails';
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

class ProfileDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: undefined,
      modalIsOpen: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  //Capturando la data de nuestra petición
  fetchData = () => {
    this.setState({
      loading: true,
      error: null
    });

    this.axiosCancelSource = axios.CancelToken.source();

    axios
      .get(
        `https://api-profiles-ag.now.sh/profiles/${this.props.match.params.id}`,
        { cancelToken: this.axiosCancelSource.token }
      )
      .then(res => {
        this.setState({
          loading: false,
          data: res.data
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      });
  };

  handleOpenModal = e => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = e => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBadge = () => {
    this.setState({
      loading: true,
      error: null
    });

    this.axiosCancelSource = axios.CancelToken.source();

    axios
      .delete(
        `https://api-profiles-ag.now.sh/profiles/${this.props.match.params.id}`,
        { cancelToken: this.axiosCancelSource.token }
      )
      .then(res => {
        this.setState({
          loading: false,
          redirect: true,
          modalIsOpen: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      });
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <ProfileDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        profile={this.state.data}
      />
    );
  }
}

export default ProfileDetailContainer;
