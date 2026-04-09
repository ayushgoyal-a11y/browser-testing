import chromium from "@sparticuz/chromium-min";

const NODE_ENV = process.env.NODE_ENV || "DEV";

const disablesArgs = ({ headless }: { headless?: boolean }) => [
  "--window-size=1920,1080",
  "--start-maximized",
  "--hide-scrollbars",
  ...[NODE_ENV !== "PROD" && !headless && "--single-process"],
  ...[NODE_ENV !== "PROD" && !headless && "--headless='new'"],
  ...[NODE_ENV !== "PROD" && !headless && "--headless='shell'"],
  "--disable-client-side-phishing-detection",
  "--disable-web-security",
];
const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";

const getArgs = ({
  headless,
}: {
  insurerCode?: string;
  headless?: boolean;
}) => {
  const baseArgs = [
    ...chromium.args.filter((arg) => !disablesArgs({ headless }).includes(arg)),
    "--disable-popup-blocking",
    "--allow-popups-during-page-unload",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-infobars",
    "--disable-blink-features=AutomationControlled",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--window-size=1920,1080",
    "--enable-automation=false",
    `--user-agent=${userAgent}`,
  ];

  return baseArgs;
};

export { getArgs };
