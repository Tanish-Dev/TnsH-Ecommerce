import { formatcurrency } from "../scripts/utils/money.js";

describe("test suite : formatCurrency", () => {
  it("converts cents to dollars", () => {
    expect(formatcurrency(2095)).toEqual("20.95");
  });

  it("works with zero", () => {
    expect(formatcurrency(0)).toEqual("0.00");
  });

  it("rounds upto the nearest cent", () => {
    expect(formatcurrency(2000.5)).toEqual("20.01");
  });
});
