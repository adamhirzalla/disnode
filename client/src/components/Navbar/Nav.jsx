import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Nav = () => {
  // TODO: fix this to use correct params from AuthContext (left intentionally)
  // for testing purposes
  const { user, authTokens } = useContext(AuthContext);

  return (
    <div>
      {!authTokens ? (
        <>
          <Link to="/" exact="true">
            Home
          </Link>
          <span> | </span>
          <Link to="/login">Login</Link>
          <span> | </span>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <p>Hello {user && user.username}</p>
      )}
    </div>
  );
};

export default Nav;
