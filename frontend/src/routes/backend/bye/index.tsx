import type { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async (requestEvent) => {
  const requestBody = await requestEvent.request.json();
  console.log("request", requestBody);

  requestEvent.json(200, { msg: "bye world" });
};
