import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "resources/i18nextForTest";
import test_en from "resources/en/global.json";
import { Range } from "components/";
import { API_ENDPOINT_RANGE_VALUES } from "api/";
import "mocks/setup-test";

const currency = "€";
const width = 300;

let rangeVal, rangeFixedRendered;
describe("Range component with min and max values", () => {
  test("Range renders appropriately, Range have min and max values", async () => {
    await fetch(API_ENDPOINT_RANGE_VALUES)
      .then((response) => response.json())
      .then((data) => {
        rangeVal = data?.rangeValues;
        const rangeFixed = rangeVal && (
          <I18nextProvider i18n={i18next}>
            <Range
              min={rangeVal[0]}
              max={rangeVal[rangeVal.length - 1]}
              width={width}
              currencyType={currency}
              readOnly={true}
              rangeVal={rangeVal}
              decimals={2}
              axis="x"
            />
          </I18nextProvider>
        );
        rangeFixedRendered = render(rangeFixed);
      })
      .catch((err) => console.error(err));
    expect(
      rangeFixedRendered.getByLabelText(test_en["min-input"]["aria-readonly"])
    ).toBeInTheDocument();
    expect(
      rangeFixedRendered.getByLabelText(test_en["max-input"]["aria-readonly"])
    ).toBeInTheDocument();
    expect(
      rangeFixedRendered.getByLabelText(test_en.draggable["aria-min"])
    ).toBeInTheDocument();
    expect(
      rangeFixedRendered.getByLabelText(test_en.draggable["aria-max"])
    ).toBeInTheDocument();
    expect(
      rangeFixedRendered.getByLabelText(test_en["min-input"]["aria-readonly"])
    ).toHaveValue(rangeVal[0]);
    expect(
      rangeFixedRendered.getByLabelText(test_en["max-input"]["aria-readonly"])
    ).toHaveValue(rangeVal[rangeVal.slice(-1)[0]]);
  });
});
