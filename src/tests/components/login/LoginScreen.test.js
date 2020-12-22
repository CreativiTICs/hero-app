import React from "react";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../components/auth/AuthContext";
import { types } from "../../../components/types/types";

describe("Pruebas en <LoginScreen/>", () => {
  const historyMock = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe realizar el dispatch y la navegación", () => {
    //Simular el clik del botón
    const handleClick = wrapper.find("button").prop("onClick");

    //La llamo la primera vez
    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Carlos",
      },
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/");
    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });
});
