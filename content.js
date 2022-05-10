// URLs that are for learning.
var studyDomains = [];

// URLs that distract
var distractDomains = [];

chrome.storage.sync.get({
    studomains: '',
    distdomains: ''
}, function (result) {
    studyDomains = result.studomains;
    distractDomains = result.distdomains;
});

let currDomain = window.location.hostname.replace('www.', '');

var domains = [];

chrome.runtime.sendMessage({ data: document.title }, function (response) {
    response.domains.forEach(function (domain) {
        domains.push(domain);
    });
    checkDistract(domains, response.blockpath);
});

function checkDistract(params, bpath) {
    studyDomains.forEach(function (domain){
        if (params.includes(domain) && distractDomains.includes(currDomain))
        {
            document.documentElement.innerHTML = '<h1>The Page is Blocked as Edu Mode is on.</h1>';
            return;
        }
    });
}