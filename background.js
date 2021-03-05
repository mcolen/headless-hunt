chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.nytimes.com',
                    pathPrefix: "/crosswords/"
                },
            }), new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.nytimes.com',
                    pathPrefix: "/puzzles/"
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
