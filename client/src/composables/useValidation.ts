// src/composables/useValidation.ts
import { ref } from "vue";
import { PostURLSchema } from "../../../shared/urlValidator";

export function useValidation() {
  const error = ref<string | null>(null);

  function validateRepoUrl(repoUrl: string): string | null {
    const result = PostURLSchema.safeParse({ repoUrl });
    if (!result.success) {
      error.value = result.error.errors[0].message;
      return null;
    }
    error.value = null;
    return repoUrl;
  }

  return { error, validateRepoUrl };
}
