import { describe, it, expect } from "vitest";
import { createReviewRequest } from "@/services/openaiService";
import { MODEL, SYSTEM_PROMPT, USER_PROMPT, MAX_TOKENS } from "@/config/openai";

describe("createReviewRequest", () => {
  it("should create a valid request object", () => {
    const code = "const x = 5;";
    const result = createReviewRequest(code);

    expect(result).toEqual({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT(code) },
      ],
    });
  });

  it("should include user code in the user message", () => {
    const code = "function test() {}";
    const result = createReviewRequest(code);

    const userMessage = result.messages.find((m) => m.role === "user");
    expect(userMessage?.content).toContain(code);
  });
});
