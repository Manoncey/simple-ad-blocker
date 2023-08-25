async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

function extractDomainsFromFile(data) {
  try {
    const lines = data.split("\n");
    const domains = lines
      .map((line) => {
        const parts = line.split(/\s+/);
        if (parts.includes("0.0.0.0") && parts.length > 1) {
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
export async function domainsListToBlock(url) {
  const rawDomains = await fetchData(url);
  const defaultFilters = [
    "*://*.doubleclick.net/*",
    "*://partner.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.google-analytics.com/*",
    "*://creative.ak.fbcdn.net/*",
    "*://*.adbrite.com/*",
    "*://*.exponential.com/*",
    "*://*.quantserve.com/*",
    "*://*.scorecardresearch.com/*",
    "*://*.zedo.com/*",
  ];
  if (rawDomains) {
    const domains = extractDomainsFromFile(rawDomains);
    const domainsAndAds = defaultFilters.concat(domains)
    return domainsAndAds;
  }
  return defaultFilters;
}
