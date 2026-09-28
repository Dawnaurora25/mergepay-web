import { describe, it, expect } from "vitest";
import { 
  MeResponseSchema, 
  GroupDetailSchema,
  ExpenseResponseSchema,
  SettlementResponseSchema,
  UploadResponseSchema
} from "../schemas";

describe("Zod validation schemas", () => {
  it("validates a valid MeResponse payload", () => {
    const payload = {
      user: {
        id: "usr_123",
        stellarAccount: "GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        displayName: "Alice",
        avatarUrl: null,
        createdAt: "2023-01-01T00:00:00Z"
      }
    };
    expect(() => MeResponseSchema.parse(payload)).not.toThrow();
  });

  it("rejects invalid payloads with missing fields", () => {
    const payload = { user: { displayName: "Alice" } }; // Missing id, stellarAccount, etc.
    const result = MeResponseSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("validates GroupDetail response", () => {
    const payload = {
      group: {
        id: "grp_1",
        name: "Test Group",
        description: null,
        createdAt: "2023-01-01T00:00:00Z"
      },
      members: [
        {
          id: "mem_1",
          groupId: "grp_1",
          userId: "usr_1",
          user: { id: "usr_1", stellarAccount: "GABC", displayName: "Alice", avatarUrl: null, createdAt: "2023-01-01T00:00:00Z" },
          joinedAt: "2023-01-01T00:00:00Z"
        }
      ]
    };
    expect(() => GroupDetailSchema.parse(payload)).not.toThrow();
  });
});
