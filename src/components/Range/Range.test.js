import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "./../../resources/i18nextForTest";
import test_en from "./../../resources/en/test.json";
import { Range } from "./Range";

const currency = "€";
const width = 300;
const values = {
  min: 1,
  max: 50,
};

let rangeRendered, rangeFixedValuesRendered;
describe("Range component with min and max values", () => {
  const range = (
    <I18nextProvider i18n={i18next}>
      <Range
        min={values.min}
        max={values.max}
        width={width}
        currencyType={currency}
        axis="x"
      />
    </I18nextProvider>
  );

  test("Range renders appropriately", () => {
    rangeRendered = render(range);
    expect(
      rangeRendered.getByLabelText(test_en["min-input"].aria)
    ).toBeInTheDocument();
    expect(
      rangeRendered.getByLabelText(test_en["max-input"].aria)
    ).toBeInTheDocument();
    expect(
      rangeRendered.getByLabelText(test_en.draggable["aria-min"])
    ).toBeInTheDocument();
    expect(
      rangeRendered.getByLabelText(test_en.draggable["aria-max"])
    ).toBeInTheDocument();
  });
  test("Range have min and max values", () => {
    rangeRendered = render(range);
    expect(rangeRendered.getByLabelText(test_en["min-input"].aria)).toHaveValue(
      values.min
    );
    expect(rangeRendered.getByLabelText(test_en["max-input"].aria)).toHaveValue(
      values.max
    );
  });
});

