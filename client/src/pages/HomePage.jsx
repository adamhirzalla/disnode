import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const HomePage = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);

  return (
    <>
      {authTokens ? (
        <div>
          Welcome {user.full_name}
          <button type="button" onClick={logoutUser}>
            Logout
          </button>
        </div>
      ) : (
        <div>Please login</div>
      )}
    </>
  );
};

export default HomePage;
