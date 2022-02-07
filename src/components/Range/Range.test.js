import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { I18nextProvider } from "react-i18next";
import i18next from "../../resources/i18nextForTest";
import test_en from "../../resources/en/test.json";
import { Range } from "./Range";
import { API, API_RANGE } from "../../../api";
import "../../mocks/setup-test";

const currency = "€";
const width = 300;

let values, rangeRendered;
describe("Range component with min and max values", () => {
  test("Range renders appropriately, Range have min and max values", async () => {
    await API.get(API_RANGE).then((response) => {
      values = response?.data && response.data;
      const range = values && (
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
      rangeRendered = render(range);
    });

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
    expect(rangeRendered.getByLabelText(test_en["min-input"].aria)).toHaveValue(
      values.min
    );
    expect(rangeRendered.getByLabelText(test_en["max-input"].aria)).toHaveValue(
      values.max
    );
  });
});
