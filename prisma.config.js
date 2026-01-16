// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: "postgresql://root:root@localhost:5432/crypto",
  },
  migrate: {
    datasourceUrl: "postgresql://root:root@localhost:5432/crypto",
  },
});
