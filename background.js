import { domainsListToBlock } from "./domain-list-to-blocks.js";

async () => {
  const domainsToBlock = await domainsListToBlock(
    "https://hosts.anudeep.me/mirror/adservers.txt"
  );

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      return { cancel: true };
    },
    { urls: domainsToBlock },
    ["blocking"]
  );
};
