// https://github.com/vlcn-io/js/blob/b1574592f87067c8d6ddc269d9ad26018cfde05b/packages/crsqlite-wasm/src/index.ts#L50
import initWasm from "@vlcn.io/crsqlite-wasm";

export default defineBackground(() => {
  const db = initWasm();
});

