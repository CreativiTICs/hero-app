import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../components/auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Pruebas en <DashboardRoutes/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Juan",
    },
  };
  test("Debe mostrarse correctamente", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Juan");
  });
});
