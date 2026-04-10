import Chromium from "@sparticuz/chromium-min";

const executablePath = async () => {
  if (process.env.NODE_ENV === "PROD") {
    return await Chromium.executablePath();
  }
  return process.env.CHROMIUM_PATH;
};

export default executablePath;
