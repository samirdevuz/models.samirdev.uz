import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

export const bootstrapAdminUserId = "760ab160-0436-4822-8cf9-f225f49d0cc8";
export const bootstrapAdminEmail = "samirabdumominov@gmail.com";

const bootstrapTokenHash =
  "a63f4798f15d1fe4b1a55aef6ec21445fdd3899ff97a17c1a0886a525a07481e";
const bootstrapExpiresAt = Date.parse("2026-07-28T00:00:00.000Z");

export function isValidBootstrapToken(token: string) {
  if (Date.now() > bootstrapExpiresAt) {
    return false;
  }

  const candidate = createHash("sha256").update(token).digest();
  const expected = Buffer.from(bootstrapTokenHash, "hex");

  return (
    candidate.length === expected.length &&
    timingSafeEqual(candidate, expected)
  );
}
