import { Fetch } from "./fetch";

function authInterceptor() {
  return {
    headerName: "x-api-key",
    headerValue: process.env.NEXT_PUBLIC_CAT_API_KEY || "",
  };
}

const fetchInstance = new Fetch("https://api.thecatapi.com/v1", [
  authInterceptor,
]);

export default fetchInstance;
