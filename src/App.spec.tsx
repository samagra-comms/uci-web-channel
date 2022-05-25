import * as React from "react";
import { mount } from "@cypress/react";
import App from "App";

it("renders the home page", () => {
  mount(<App />);
  cy.contains(/chaks/i);
});
