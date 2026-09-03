import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const mediaService = readFileSync(join(root, "services", "projectMediaService.ts"), "utf8");
const localStorage = readFileSync(join(root, "lib", "storage", "localPrivateStorage.ts"), "utf8");
const provider = readFileSync(join(root, "lib", "storage", "provider.ts"), "utf8");

assert.ok(!existsSync(join(root, "public", ".private-storage")));
assert.match(localStorage, /path\.resolve\(root, key\)/);
assert.match(localStorage, /startsWith\(root \+ path\.sep\)/);
assert.match(mediaService, /validateMediaBuffer/);
assert.match(mediaService, /enforceRateLimit/);
assert.match(mediaService, /MEDIA_STAFF_ROLES/);
assert.match(provider, /must not be used in production/);
assert.match(provider, /S3PrivateStorageProvider/);
console.log("Phase 1B security invariants passed.");