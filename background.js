import { domainsListToBlock } from "./ads-and-domains-list-to-block.js";

async () => {
  const domainsToBlock = await domainsListToBlock(
    "https://hosts.anudeep.me/mirror/adservers.txt"
  );

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const condition = domainsToBlock.some((domain) => details.url.includes(domain))
        console.log('details',details)
      if (condition) {
        return { cancel: true };
      }
      return { cancel: false };
    },
    { urls: ["<all_urls>"] }
  );
};
