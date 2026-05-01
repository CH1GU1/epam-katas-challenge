import { http, HttpResponse } from "msw";

const BASE = "http://localhost:8000";

export const handlers = [
  http.post(`${BASE}/dictionary/add`, () =>
    HttpResponse.json({ message: "Entry 'Apple' added successfully" }),
  ),

  http.post(`${BASE}/dictionary/look`, async ({ request }) => {
    const body = (await request.json()) as { word: string };
    if (body.word === "Apple") {
      return HttpResponse.json({
        word: "Apple",
        definition: "A fruit",
        found: true,
      });
    }
    return HttpResponse.json({
      word: body.word,
      definition: `Can't find entry for ${body.word}`,
      found: false,
    });
  }),

  http.post(`${BASE}/shopping/total`, () =>
    HttpResponse.json({
      items_found: ["socks", "shoes"],
      items_ignored: [],
      subtotal: 65,
      tax_amount: 5.85,
      total: 70.85,
    }),
  ),

  http.post(`${BASE}/nth-letter/decode`, () =>
    HttpResponse.json({
      result: "yes",
      breakdown: [
        { word: "yoda", position: 0, letter: "y" },
        { word: "best", position: 1, letter: "e" },
        { word: "has", position: 2, letter: "s" },
      ],
    }),
  ),
];
