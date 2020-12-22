import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe("Pruebas en <PrivateRoute/>", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };
  //Emular el local storage
  Storage.prototype.setItem = jest.fn();

  test("Debe mostrar el componente si está autenticado y guardar localStorage", () => {
    const wrapper = mount(
      //Si nos da el error de Route ponemos MemoryRouter, falsea diferentes rutas
      <MemoryRouter>
        <PrivateRoute
          isAuth={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("Debe bloquear el componente si no está autenticado", () => {
    const wrapper = mount(
      //Si nos da el error de Route ponemos MemoryRouter, falsea diferentes rutas
      <MemoryRouter>
        <PrivateRoute
          isAuth={false}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });
});
