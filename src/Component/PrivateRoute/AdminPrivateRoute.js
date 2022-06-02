import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminPrivateRoute = ({ component, children, ...rest }) => {
  // redux store call
  const adminSigninData = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSigninData;

  return (
    <div>
      <Route
        component={component}
        {...rest}
        render={({ location }) =>
          adminInfo ? (
            children
            
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default AdminPrivateRoute;
