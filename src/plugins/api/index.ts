import createClient, { FetchResponse } from "openapi-fetch";
import { storeToRefs } from "pinia";
import { UseAsyncStateOptions, useAsyncState } from "@vueuse/core";
import { useAuthStore } from "../../store/auth";
import type { operations, paths } from "./types";

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

type ApiCall<T> = () => Promise<FetchResponse<T, undefined>>;
type Operation = operations[keyof operations];

export const useStateApi = <K = Operation>(
  apiCall: ApiCall<K>,
  options?: UseAsyncStateOptions<boolean, any>,
) =>
  useAsyncState(
    async () => {
      const { data, error } = await apiCall();

      if (error) {
        throw error;
      }

      if (!data) {
        return null;
      }

      return data as Required<typeof data>;
    },
    undefined,
    options,
  );
