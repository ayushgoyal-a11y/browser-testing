// browser.ts
import { launch, Browser } from "rebrowser-puppeteer-core";
import { getSparticuzConfig } from "./sparticuzConfig";
import { closePages } from "./getPage";

global.browserInstance = null;
global.messages = [];

export const initBrowser = async (): Promise<Browser> => {
  if (global.browserInstance) {
    console.log("Browser already initialized");
    return global.browserInstance;
  }

  try {
    console.log(
      "Launching browser with headless =",
      process.env.NODE_ENV === "PROD",
    );
    const config = await getSparticuzConfig();
    console.log("Config ready, launching...");

    global.browserInstance = await launch(config);
    console.log("Browser launched:", global.browserInstance);

    // Listen for browser disconnects
    global.browserInstance.on("disconnected", async () => {
      try {
        if (global.browserInstance) await closePages(global.browserInstance);
      } catch (err) {
        console.warn("Error closing pages on disconnect:", err);
      } finally {
        global.browserInstance = null;
      }
    });

    return global.browserInstance;
  } catch (err) {
    console.error("Error launching browser:", err);
    throw err;
  }
};

export const getBrowserInstance = () => global.browserInstance;
