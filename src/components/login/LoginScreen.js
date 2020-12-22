import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";

//Desestructuramos y enviamos como parámetro el history
export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    dispatch({
      type: types.login,
      payload: {
        name: "Carlos",
      },
    });
    //Al tocar el botón nos redirecciona a donde queramos y no guarda el historial con el replace
    history.replace(lastPath);
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-dark" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
};
