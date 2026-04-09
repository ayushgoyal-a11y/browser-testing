import { handler } from "./index.js";
import { initBrowser } from "./browser/initBrowser.js";

const dev = async () => {
  // Launch browser for local development
  await initBrowser({ headless: false });

  try {
    const response = await handler();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error in handler:", error);
  }
};
dev();
