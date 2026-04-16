import puppeteer from "rebrowser-puppeteer-core";

export const debug = async () => {
  console.log("debug");
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    args: [
      "--remote-debugging-port=9222", //
      "--remote-debugging-address=0.0.0.0", //
      "--no-sandbox",
    ],
  });

  console.log("Browser launched");

  console.log(browser.wsEndpoint());
};
debug();
