import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "../../resources/i18nextForTest";
import test_en from "../../resources/en/test.json";
import { Range } from "./Range";
import { API, API_RANGE_VALUES } from "../../../api";
import "../../mocks/setup-test";

const currency = "€";
const width = 300;

let rangeVal, rangeFixedRendered;
describe("Range component with min and max values", () => {
  test("Range renders appropriately, Range have min and max values", async () => {
    await API.get(API_RANGE_VALUES).then((response) => {      
      rangeVal = response?.data && response.data.rangeValues;
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
      rangeFixedRendered = render(rangeFixed)
    });    
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
    ).toHaveValue(rangeVal[rangeVal.length - 1]);
  });
});

