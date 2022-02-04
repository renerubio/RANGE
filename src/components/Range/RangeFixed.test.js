import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "../../resources/i18nextForTest";
import test_en from "../../resources/en/test.json";
import { Range } from "./Range";

const currency = "€";
const width = 300;
const rangeVal = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

let rangeFixedRendered;
describe("Range component with min and max values", () => {

  const rangeFixed = (
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
  test("Range renders appropriately", () => {
    rangeFixedRendered = render(rangeFixed);
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
  });

  test("Range with fixed data, have min and max values", () => {
    rangeFixedRendered = render(rangeFixed);
    expect(
      rangeFixedRendered.getByLabelText(test_en["min-input"]["aria-readonly"])
    ).toHaveValue(rangeVal[0]);
    expect(
      rangeFixedRendered.getByLabelText(test_en["max-input"]["aria-readonly"])
    ).toHaveValue(rangeVal[rangeVal.length - 1]);
  });
});

