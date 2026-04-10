import { handler } from "./index.js";
const dev = async () => {
  console.time('dev')
  try {
    const response = await handler();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error in handler:", error);
  }
  console.timeEnd('dev')
};
dev();
