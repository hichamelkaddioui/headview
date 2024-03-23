import createClient from "openapi-fetch";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
import type { paths } from "./types";

export const api = () => {
  const { authorizationHeaders, baseUrl } = storeToRefs(useAuthStore());
  const options = {
    baseUrl: baseUrl.value,
    headers: authorizationHeaders.value,
  };
  return createClient<paths>(options);
};

export const initState = {
  data: {},
  error: undefined,
  response: new Response(),
};
