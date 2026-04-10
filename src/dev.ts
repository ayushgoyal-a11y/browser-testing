import { handler } from "./index.js";
const dev = async () => {
  try {
    const response = await handler();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error in handler:", error);
  }
};
dev();
