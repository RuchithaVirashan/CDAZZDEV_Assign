import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

interface ProfileProps {}

interface ProfileState {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
}

const Profile: React.FC<ProfileProps> = () => {
  const [state, setState] = useState<ProfileState>({
    redirect: null,
    userReady: false,
    currentUser: { accessToken: "" },
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = AuthService.getCurrentUser();
      console.log(`get user ${currentUser}`);

      if (!currentUser) {
        setState((prevState) => ({ ...prevState, redirect: "/home" }));
      } else {
        setState((prevState) => ({
          ...prevState,
          currentUser,
          userReady: true,
        }));
      }
    };

    fetchCurrentUser();
  }, []);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }

  const { currentUser, userReady } = state;

  return (
    <div className="container">
      {userReady ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>

          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
