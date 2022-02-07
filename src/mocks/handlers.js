import { rest } from "msw";
import { API_BASE, API_RANGE, API_RANGE_VALUES } from "../../api";

export const handlers = [
  rest.get(`${API_BASE}${API_RANGE}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        min: 1,
        max: 50,
      })
    );
  }),
  rest.get(`${API_BASE}${API_RANGE_VALUES}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99, 8888888],
      })
    );
  }),
];
