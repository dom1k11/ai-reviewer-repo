import introJs from "intro.js";
import "intro.js/introjs.css";
import { ref } from "vue";

const hasSeen = ref<boolean>(localStorage.getItem("seenOnboarding") === "true");

export function useOnboarding() {
  function resetOnboarding(): void {
    localStorage.removeItem("seenOnboarding");
    hasSeen.value = false;
  }

  function startOnboarding(): void {
    if (hasSeen.value) return;

    const intro = introJs();

    setTimeout(() => {
      intro.setOptions({
        steps: [
          {
            intro: `Welcome to quick intoduction!<br>`,
          },
          {
            element: document.querySelector("#repo-input") as HTMLElement | null,
            intro: "✏️ Input your github repository",
          },
          {
            element: document.querySelector("#get-review-btn") as HTMLElement | null,
            intro: "Confirm to get review",
          },
          {
            element: document.querySelector("#review-container") as HTMLElement | null,
            intro: "See your result",
          },

          {
            intro: ` Brr brr patapim 💾`,
          },
        ],
      });

      intro.onexit(() => {
        localStorage.setItem("seenOnboarding", "true");
        hasSeen.value = true;
      });

      intro
        .oncomplete(() => {
          localStorage.setItem("seenOnboarding", "true");
          hasSeen.value = true;
        })
        .start();
    }, 300);
  }
  return { startOnboarding, resetOnboarding };
}
