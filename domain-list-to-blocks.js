// import { writeFileSync, readFileSync } from "fs";

async function fetchAndCreateTxtFile(url, fileName) {
  try {
    const response = await fetch(url);
    const data = await response.text();

    writeFileSync(fileName, data, "utf-8");
    console.log(`File "${fileName}" created successfully.`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

function extractDomainsFromFile(fileName) {
  try {
    const data = readFileSync(fileName, "utf-8");
    const lines = data.split("\n");
    const domains = lines
      .map((line) => {
        const parts = line.split(/\s+/);
        if (parts.length > 1) {
          return parts[1];
        }
      })
      .filter(Boolean);
    return domains;
  } catch (error) {
    console.error("An error occurred:", error.message);
    return [];
  }
}
 async function domainsListToBlock(url) {
  const fileName = "adservers.txt";
  await fetchAndCreateTxtFile(url, fileName);
  const domains = extractDomainsFromFile(fileName);
  console.log(domains);
  return domains;
}
