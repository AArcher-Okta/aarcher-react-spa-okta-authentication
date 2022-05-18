import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';


const Home = () => {
  // const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="home">
      <div>
        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p id="welcome">
            Welcome, &nbsp;
            {userInfo.name}
            !
          </p>
          <p className="information">
            You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
            Visit the
            {' '}
            <a href="/profile">My Profile</a>
            {' '}
            page to take a look inside the ID token.
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p className="information">
            When you click the <a href="/login">login</a>, you will be presented the login page on the Okta Sign-In Widget hosted within the application.
            After you authenticate, you will be logged in to this application with an ID token and access token. These tokens will be stored in local storage and can be retrieved at a later time.
          </p>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;