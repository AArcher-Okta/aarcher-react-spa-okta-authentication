import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
// import { Button } from 'semantic-ui-react';

const Navbar = ({ setCorsErrorModalOpen }) => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  // Note: Can't distinguish CORS error from other network errors
  const isCorsError = (err) => (err.name === 'AuthApiError' && !err.errorCode && err.xhr.message === 'Failed to fetch');

  const login = async () => history.push('/login');

  const logout = async () => {
    const basename = window.location.origin + history.createHref({ pathname: '/' });
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  };

  if (!authState) {
    return null;
  }

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <div className="navbarItems">
            <div className="navlink">
              <Menu.Item id="home">
                <Link to="/">Home</Link>
                <span className="separate">|</span>
              </Menu.Item>
            </div>
            <div className="navlink">  
              {authState.isAuthenticated && (
                <Menu.Item id="profile-button">
                  <Link to="/profile">Profile</Link>
                  <span className="separate">|</span>
                </Menu.Item>
              )}
            </div>
            <div className="navlink">
              {authState.isAuthenticated && (
                <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
              )}
              {!authState.isPending && !authState.isAuthenticated && (
                <Menu.Item onClick={login}>Login</Menu.Item>
              )} 
            </div>
          </div>
          <hr />
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;