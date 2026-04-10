import { getArgs } from "./args.js";
import defaultViewport from "./defaultViewport.js";
import path from "./executablePath.js";

const getSparticuzConfig = async () => {
  const headless = process.env.NODE_ENV === "PROD";
  console.log({ headless });

  return {
    args: getArgs({ headless }),
    defaultViewport,
    executablePath: await path(),
    headless,
    ignoreHTTPSErrors: true,
    handleSIGHUP: false,
    handleSIGINT: false,
    handleSIGTERM: false,
    pipe: true,
  };
};

export { getSparticuzConfig };
