// browser.ts
import { launch, Browser } from "rebrowser-puppeteer-core";
import { getSparticuzConfig } from "./sparticuzConfig";
import { closePages } from "./getPage";

let browserInstance: Browser | null = null;

export const initBrowser = async (): Promise<Browser> => {
  if (browserInstance) {
    console.log("Browser already initialized");
    return browserInstance;
  }

  try {
    console.log("Launching browser with headless =", process.env.NODE_ENV === "PROD");
    const config = await getSparticuzConfig();

    browserInstance = await launch(config);
    console.log("Browser launched:", browserInstance);

    // Listen for browser disconnects
    browserInstance.on("disconnected", async () => {
      try {
        if (browserInstance) await closePages(browserInstance);
      } catch (err) {
        console.warn("Error closing pages on disconnect:", err);
      } finally {
        browserInstance = null;
      }
    });

    return browserInstance;
  } catch (err) {
    console.error("Error launching browser:", err);
    throw err;
  }
};

export const getBrowserInstance = () => browserInstance;
