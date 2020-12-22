import React from "react";
import { mount } from "enzyme";
import { SearchScreen } from "../../../components/search/SearchScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("Pruebas en <SearchScreen/>", () => {
  test("Debe mostrarse correctamente con los valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a Hero");
  });

  test("Debe mostrar a batman y el input con el valor del queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar un error si no se encuentra el Hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman12234"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "There is no a Hero with batman12234"
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar el push del history", () => {
    const historyMock = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({
      preventDefault() {},
    });

    expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
