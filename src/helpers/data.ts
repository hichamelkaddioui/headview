import { faker } from "@faker-js/faker";

export const userFactory = () => {
  const id = `${faker.number.int({ max: 10 })}`;
  const name = faker.person.firstName();
  const createdAt = faker.date.past().toISOString();

  return { id, name, createdAt };
};

const preAuthKeyFactory = () => ({
  id: `${faker.number.int({ max: 10 })}`,
  user: faker.person.firstName(),
  key: faker.string.alphanumeric({ casing: "lower", length: 48 }),
  reusable: faker.datatype.boolean(),
  ephemeral: faker.datatype.boolean(),
  used: faker.datatype.boolean(),
  expiration: faker.date.future(),
  createdAt: faker.date.past(),
  aclTags: [],
});

export const machineFactory = (idx: number) => {
  const id = faker.number.int({ max: 10 });
  const givenName = faker.animal.type() as keyof (typeof faker)["animal"];
  const name = faker.animal[givenName]();
  const registerMethod = [
    "REGISTER_METHOD_UNSPECIFIED",
    "REGISTER_METHOD_AUTH_KEY",
    "REGISTER_METHOD_CLI",
    "REGISTER_METHOD_OIDC",
  ][Math.floor(Math.random() * 4)];

  return {
    id: `${id}`,
    machineKey: faker.string.alphanumeric({ casing: "lower", length: 64 }),
    nodeKey: faker.string.alphanumeric({ casing: "lower", length: 64 }),
    discoKey: faker.string.alphanumeric({ casing: "lower", length: 64 }),
    ipAddresses: [`100.0.64.${idx}`, faker.internet.ipv6()],
    name,
    user: userFactory(),
    lastSeen: faker.date.past(),
    lastSuccessfulUpdate: faker.date.past(),
    expiry: faker.date.future(),
    preAuthKey: [preAuthKeyFactory()],
    createdAt: faker.date.past(),
    registerMethod,
    forcedTags: [],
    invalidTags: [],
    validTags: [],
    givenName: `${givenName}-${id}`,
    online: faker.datatype.boolean(),
  };
};
