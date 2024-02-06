import { HelloInADivFromAnotherPackage } from "@test/ui";
import { HelloInADiv } from "../components/HelloInADiv";
import { createRoot } from "react-dom/client";

export default defineContentScript({
  matches: [
    "<all_urls>"
  ],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      anchor: "body",
      name: "div",
      position: "overlay",
      append: "after",
      onMount: (uiContainer, shadow, shadowHost) => {
        const root = createRoot(uiContainer);
        root.render(<div>
          <HelloInADiv />
          <HelloInADivFromAnotherPackage />
        </div>);
        return root;
      },
      onRemove: (root) => {
        root.unmount();
      }
    });

    ui.mount();
  }
});
