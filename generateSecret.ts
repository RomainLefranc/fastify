import crypto from "crypto";

console.log("Generated Secret:", crypto.randomBytes(32).toString("hex"));
