import React from "react";
import { Link } from "react-router-dom";
import logoGeek from "../images/logo-ag-min.png";
import "./styles/ProfileDetailStyle.css";
import Profile from "../components/Profile";
import DeleteBadgeModal from "../components/DeleteBadgeModal";


function ProfileDetails(props) {

  const profile = props.profile;

  return (
    <React.Fragment>
      <div className="ProfileDetail__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img
                className="ProfileDetail__logo"
                src={logoGeek}
                alt="Logo Geek Conf"
              />
            </div>
            <div className="col-6 ProfileDetail__hero-attendant-name">
              <h1>
                {profile.firstName} <br /> {profile.lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 ">
            <Profile
              firstName={profile.firstName}
              lastName={profile.lastName}
              jobTitle={profile.jobTitle}
              twitter={profile.twitter}
              email={profile.email}
            />
          </div>
          <div className="col-6">
            <h2>Acciones</h2>
            <div>
              <div>
                <Link
                  className="btn btn-primary mb-4"
                  to={`/profiles/${profile.id}/edit`}
                >
                  Editar
                </Link>
              </div>
              <div>
                <button
                  onClick={props.onOpenModal}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <DeleteBadgeModal
                  onClose={props.onCloseModal}
                  isOpen={props.modalIsOpen}
                  onDeleteBadge={props.onDeleteBadge}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileDetails;
