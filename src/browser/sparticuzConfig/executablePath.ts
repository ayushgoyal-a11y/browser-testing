import Chromium from "@sparticuz/chromium-min";

const executablePath = async () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("AWS_EXECUTION_ENV:", process.env.AWS_EXECUTION_ENV);
  console.log("CHROMIUM_PATH:", process.env.CHROMIUM_PATH);

  if (process.env.NODE_ENV === "PROD") {
    return await Chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.arm64.tar",
    );
  }
  return process.env.CHROMIUM_PATH;
};

export default executablePath;
