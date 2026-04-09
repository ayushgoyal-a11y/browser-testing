import { getArgs } from "./args.js";
import defaultViewport from "./defaultViewport.js";
import path from "./executablePath.js";

const getSparticuzConfig = async ({ headless }: { headless?: boolean }) => {
  console.log({ headless });

  return {
    args: getArgs({
      headless,
    }),
    defaultViewport,
    executablePath: await path(),
    headless: headless ?? false,
    ignoreHTTPSErrors: true,
    handleSIGHUP: false,
    handleSIGINT: false,
    handleSIGTERM: false,
    pipe: true,
  };
};

export { getSparticuzConfig };
