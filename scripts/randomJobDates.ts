import { writeFile } from "fs/promises";
import jobs from "../public/data/jobs.json";

// Get current timestamp and one month ago timestamp
const now = new Date().getTime();
const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

// Update timestamps for all jobs
const updatedJobs = jobs.map(job => ({
  ...job,
  timestamp: Math.floor(Math.random() * (now - oneMonthAgo) + oneMonthAgo)
})).sort((a, b) => b.timestamp - a.timestamp);

// Write the updated jobs back to the file
await writeFile("public/data/jobs.json", JSON.stringify(updatedJobs, null, 2));

console.info("Successfully updated timestamps for all jobs");
