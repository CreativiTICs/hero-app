import React from "react";
import { mount } from "enzyme";
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("Pruebas en <HeroScreen/>", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test("Debe mostrar el componente redirect si no hay args en el URL ", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("Debe mostrar un Hero si el parámetro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("Debe regresar a la pantalla anterior con push", () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(historyMock.push).toHaveBeenCalledWith("/");
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test("Debe regresar a la pantalla anterior goBack", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(historyMock.goBack).toHaveBeenCalled();
    expect(historyMock.push).not.toHaveBeenCalled();
  });

  test("Debe llamar el Redirect si el Hero no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-captain2135513"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe("");
  });
});
