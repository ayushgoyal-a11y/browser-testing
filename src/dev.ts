import { handler } from "./index.js";
import * as dotenv from "dotenv";

dotenv.config();

const dev = async () => {
  try {
    const response = await handler();
    console.log("Response:", response);
  } catch (error) {
    console.error("Error in handler:", error);
  }
};
dev();
