async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

var domains = [];
var currDomain = "";

chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
            var domain = (new URL(tab.url));
            domain = domain.hostname.replace('www.', '');
            domains.push(domain);
        });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({
        domains: domains
    });
})