import { describe, it, expect } from "vitest";
import { createGroupSchema, settleBalanceSchema } from "../validation";
import { anchorTransferSchema } from "../validations/anchor";

describe("Input validation schemas", () => {
  it("validates create group", () => {
    expect(() => createGroupSchema.parse({ name: "My Group" })).not.toThrow();
    expect(createGroupSchema.safeParse({ name: "" }).success).toBe(false);
  });

  it("validates anchor transfer input", () => {
    expect(() => anchorTransferSchema.parse({ amount: "10.5", destination: "GABC" })).not.toThrow();
    expect(anchorTransferSchema.safeParse({ amount: "invalid" }).success).toBe(false);
  });
});
