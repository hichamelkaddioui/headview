import { PreAuthKey } from "./types";

export const enrichKeys = (keys: PreAuthKey[]) =>
  keys
    .filter((key): key is Required<PreAuthKey> => !!key)
    .map((key) => {
      const expiration = new Date(key.expiration);
      const expired = +expiration - +new Date() < 0;

      return { ...key, expired };
    });
