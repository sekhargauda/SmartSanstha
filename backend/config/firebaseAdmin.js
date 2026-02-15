// // backend/config/firebaseAdmin.js
// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const serviceAccountPath = path.resolve(
//   __dirname,
//   "./firebase-service-account.json"
// );

// const serviceAccount = JSON.parse(
//   fs.readFileSync(serviceAccountPath, "utf-8")
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// console.log("✅ Firebase Admin initialized successfully");

// export default admin;







// backend/config/firebaseAdmin.js
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

try {
  // 1. Check for Environment Variable (For Render/Production)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.log("📝 Loading Firebase credentials from Environment Variable...");
    // Parse the JSON string from the env var
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } 
  // 2. Fallback to Local File (For Development)
  else {
    console.log("📂 Loading Firebase credentials from local file...");
    const serviceAccountPath = path.resolve(
      __dirname,
      "./firebase-service-account.json"
    );
    
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    } else {
      throw new Error(`Firebase service account file not found at: ${serviceAccountPath}`);
    }
  }

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("✅ Firebase Admin initialized successfully");

} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin:", error.message);
  // We don't exit process here so other parts of app might still run, 
  // but usually auth will fail without this.
}

export default admin;