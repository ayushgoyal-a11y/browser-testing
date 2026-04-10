import { Page } from "rebrowser-puppeteer-core";
function logMemory(label: string) {
    const mem = process.memoryUsage();

    console.log(`\n [${label}] Memory Usage`);
    console.log(`RSS: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(mem.external / 1024 / 1024).toFixed(2)} MB`);
}

export const automate = async (page: Page) => {
  try {
    logMemory("initial");

    await page.goto(
      "https://www.youtube.com/results?search_query=samay+raina+podcast",
      {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      },
    );
    console.log("youtube loaded");
    logMemory("after youtube");

    //sleep for 3second
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.goto("https://www.figma.com/", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    console.log("figma loaded");

    //sleep for 3second
    await new Promise((resolve) => setTimeout(resolve, 3000));
    logMemory("after figma");

    console.log("automation completed");
  } catch (error) {
    console.log("error in automation", error);
    throw error;
  }
};
