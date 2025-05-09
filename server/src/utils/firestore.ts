import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

// 1. Validate environment variables
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"); // Fix newlines
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const projectId = process.env.GOOGLE_PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;

if (!privateKey || !clientEmail || !projectId || !storageBucket) {
  throw new Error("❌ Missing required Firebase environment variables");
}

// 2. Initialize Firebase Admin SDK
const firebaseConfig = {
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  storageBucket,
};

const app = initializeApp(firebaseConfig);

// 3. Initialize Firestore & Storage
const db = getFirestore(app);
const bucket = getStorage(app).bucket();

export { db, bucket };