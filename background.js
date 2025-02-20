chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "blockApp") {
        chrome.storage.local.get(["selectedApp", "blockTime"], (data) => {
            if (!data.selectedApp) return;

            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    if (tab.url.includes(data.selectedApp)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
            });
        });
    }
});
