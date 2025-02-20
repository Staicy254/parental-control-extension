document.getElementById("setLimit").addEventListener("click", () => {
    const selectedApp = document.getElementById("appSelect").value;
    const timeLimit = document.getElementById("timeLimit").value;
    const statusMessage = document.getElementById("status");

    if (!timeLimit || isNaN(timeLimit) || timeLimit <= 0) {
        statusMessage.textContent = "⚠️ Please enter a valid time limit.";
        statusMessage.style.color = "red";
        return;
    }

    const blockTime = new Date().getTime() + timeLimit * 60000; // Convert minutes to milliseconds

    chrome.storage.local.set({ selectedApp, blockTime }, () => {
        statusMessage.textContent = ` ${selectedApp} will be blocked in ${timeLimit} minute(s).`;
        statusMessage.style.color = "green";
        chrome.alarms.create("blockApp", { delayInMinutes: parseInt(timeLimit) });
    });
});
