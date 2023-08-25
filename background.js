import { domainsListToBlock } from "./domain-list-to-blocks.js";

async () => {
  const domainsToBlock = await domainsListToBlock(
    "https://hosts.anudeep.me/mirror/adservers.txt"
  );
  const defaultFilters = [
    "doubleclick.net",
    "partner.googleadservices.com/",
    ".googlesyndication.com/",
    ".google-analytics.com/",
    "creative.ak.fbcdn.net/",
    ".adbrite.com/",
    ".exponential.com/",
    ".quantserve.com/",
    ".scorecardresearch.com/",
    ".zedo.com/",
  ];

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (defaultFilters.some(domain => details.url.includes(domain)))
      return { cancel: true };
    },
    { urls: domainsToBlock },
  );
};
