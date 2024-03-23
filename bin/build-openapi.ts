import { writeFile } from "fs/promises";
import { join } from "path";
import * as document from "../src/plugins/api/headscale.swagger.json";

(async function writeApiSpecsToClient() {
  const documentParsed = JSON.parse(JSON.stringify(document));
  const openApiTypescript = (await import("openapi-typescript")).default;
  const apiTs = await openApiTypescript(documentParsed);

  await writeFile(join("./src/plugins/api", "types.d.ts"), apiTs);
})();
