import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "resources/i18nextForTest";
import test_en from "resources/en/global.json";
import { Loading } from "components/";

let loadingRendered;
describe("Loading component ", () => {
  test("Loading renders appropriately with text", () => {
    loadingRendered = render(
      <I18nextProvider i18n={i18next}>
        <Loading />
      </I18nextProvider>
    );
    expect(loadingRendered.getByText(test_en.loading)).toBeInTheDocument();
  });
});
