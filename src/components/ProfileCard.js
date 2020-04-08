import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../pages/styles/ProfileListStyle.css";
import tw_logo from "../images/icon-twitter.png";

import Gravatar from "./Gravatar";

class ProfileCardItem extends Component {
  render() {
    return (
      <div className="d-flex">
        <Gravatar
          className="ProfileList__avatar-list"
          email={this.props.profile.email}
        />
        <div>
          {this.props.profile.firstName} {this.props.profile.lastName}
          <br />
          {this.props.profile.jobTitle}
          <br />
          <img className="tw__logo" src={tw_logo} alt="twitter logo" />
          <span className="twitter__blue_font">
            {this.props.profile.twitter}
          </span>
        </div>
      </div>
    );
  }
}

function useSearchProfiles(profiles){
      //utilizando nuestro primer hook
  const [query, setQuery] = React.useState("");
  //convirtiendo en estado el filter
  const [filteredResults, setFilteredResults] = React.useState(profiles);
  //filtrando
  React.useMemo(() => {
    const result = profiles.filter(profile => {
      return `${profile.firstName} ${profile.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    if(filteredResults.length !== result.length){
        setFilteredResults(result);
    }

  }, [filteredResults.length, profiles, query]);

  return {query, setQuery, filteredResults}
}

function ProfileCard(props) {
  //const profiles = props.pofiles;
  const {query, setQuery, filteredResults} = useSearchProfiles(props.profiles);
  if (filteredResults.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filtrar Perfiles</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No se han encontrado perfiles</h3>

        <Link className="btn btn-primary" to="/profiles/new">
          Crea un nuevo Perfil.
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="form-group">
        <label>Filtrar Perfiles</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredResults.map(profile => {
          return (
            <li key={profile._id} className="ProfileList__section-name-list">
              <Link
                className="text-reset text-decoration-none"
                to={`/profiles/${profile.id}`}
              >
                <ProfileCardItem profile={profile} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProfileCard;
