import React from "react";
import { mount } from "enzyme";
import { Navbar } from "../../../components/ui/NavBar";
import { MemoryRouter, Router } from "react-router-dom";

import { AuthContext } from "../../../components/auth/AuthContext";
import { types } from "../../../components/types/types";

describe("Pruebas en el <NavBar/>", () => {
  //Generar un history mock para probar el history
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn,
    createHref: jest.fn,
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Pedro",
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        {/* Le enviamos el historyMock al Router */}
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  //Cuando se hace el mock se debe limpiar
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe mostrarse correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Pedro");
  });

  test("Debe llamar el logout y usar history", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });
    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
