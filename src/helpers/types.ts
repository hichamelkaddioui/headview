import { components } from "../plugins/api/types";

export type Machine = Required<components["schemas"]["v1Machine"]>;
export type User = Required<components["schemas"]["v1User"]>;
export type PreAuthKey = components["schemas"]["v1PreAuthKey"];
