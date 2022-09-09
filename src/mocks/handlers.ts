import { rest } from "msw";
import _apartments from "./apartments.json";
import { Apartment } from "@/interfaces/apartment";

const TIME_TO_RESPONSE = 1000;

export const handlers = [
  rest.get("/apartments", (req, res, ctx) => {
    const isSuccess = !!Math.round(Math.random());
    const apartments: Apartment[] = _apartments;

    if (isSuccess) {
      return res(
        ctx.delay(TIME_TO_RESPONSE),
        ctx.status(200),
        ctx.json(apartments)
      );
    }
    return res(
      ctx.delay(TIME_TO_RESPONSE),
      ctx.status(500),
      ctx.json({
        errorMessage: "Всё сломалось 😐",
      })
    );
  }),
];
