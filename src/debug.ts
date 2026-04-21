import puppeteer from "rebrowser-puppeteer-core";

//replace with the tunnel URL
const TUNNEL_URL = "https://bargains-hats-musical-submission.trycloudflare.com";
const PROXY_HOST = process.env.PROXY_HOST || "localhost";
const PROXY_PORT = process.env.PROXY_PORT || "3000";

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
      `--proxy-server=http://${PROXY_HOST}:${PROXY_PORT}`,
    ],
  });

  console.log("Browser launched:", browser.wsEndpoint());

  const tunnelUrl = TUNNEL_URL.replace("https://", "wss://").trim();
  const socketUrl = browser.wsEndpoint().split("9222")[1];

  console.log("Socket URL:", tunnelUrl + socketUrl);
};
debug();
