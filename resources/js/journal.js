const display = document.querySelector("#name-display");
const journalNameDisplay = document.querySelector("#journal-name-display");
const submitBtn = document.querySelector("#submit");
const clearBtn = document.querySelector("#clear");

function renderUser() {
    const userData = window.localStorage.getItem("user-info") || []
    if (userData != "noUser") {
        const dataObj = JSON.parse(userData)
        const username = dataObj.username;

        const header = document.createElement("h3");
        header.textContent = "Hi " + username + "! Welcome back!";
        display.appendChild(header)

        const journalHeader = document.createElement("h3");
        journalHeader.textContent = username + "'s Journal";
        journalNameDisplay.appendChild(journalHeader);
    }

}

function addEntry(event) {
    event.preventDefault();

    //get input elements
    const entryEl = document.querySelector("#entry");
    const dateEl = document.querySelector("#date");
    const reportedEl = document.querySelector("#reported");
    const actualEl = document.querySelector("#actual");

    const entry = entryEl.value;
    const date = dateEl.value;
    const reported = reportedEl.value;
    const actual = actualEl.value;

    let entryPost = {
        entry: entry,
        date: date,
        reported: reported,
        actual: actual
    }


    let entryData = window.localStorage.getItem("entry-list") || [];

    if (entryData.length == 0) {
        entryData.push(entryPost);
        localStorage.setItem("entry-list", JSON.stringify(entryData));
        renderEntries();
    } else {
        let entryArray = JSON.parse(entryData);
        entryArray.push(entryPost)
        localStorage.setItem("entry-list", JSON.stringify(entryArray));
        renderEntries();
    }
}

function renderEntries() {
    const journalDisplay = document.querySelector("#journal-entries")

    //clear table before rendering
    const tableArray = document.querySelectorAll("td");
    for (let j = 0; j < tableArray.length; j++) {
        const element = tableArray[j];
        element.remove();
    }

    const trArray = document.querySelectorAll(".deletable");
    for (let k = 0; k < trArray.length; k++) {
        const element = trArray[k];
        element.remove();
    }

    const entryData = window.localStorage.getItem("entry-list");
    if (entryData) {
        const entryArray = JSON.parse(entryData);
        for (let i = 0; i < entryArray.length; i++) {
            //get individual entry and properties
            const singleEntry = entryArray[i];
            const entry = singleEntry.entry;
            const date = singleEntry.date;
            const reported = singleEntry.reported;
            const actual = singleEntry.actual;

            //create table elements
            const trEl = document.createElement("tr");
            const tdDate = document.createElement("td");
            const tdEntry = document.createElement("td");
            const tdReported = document.createElement("td");
            const tdActual = document.createElement("td");

            //populate content
            tdDate.textContent = date;
            tdEntry.textContent = entry;
            tdReported.textContent = reported;
            tdActual.textContent = actual;

            //add style classes
            trEl.setAttribute("class", "deletable")
            tdDate.setAttribute("class", "left");
            tdEntry.setAttribute("class", "right");
            tdReported.setAttribute("class", "right");
            tdActual.setAttribute("class", "right")

            //append elements
            journalDisplay.appendChild(trEl);
            trEl.appendChild(tdDate);
            trEl.appendChild(tdEntry);
            trEl.appendChild(tdReported);
            trEl.appendChild(tdActual);
        }
    }


}

function clearJournal() {
    const emptyArray = [];
    window.localStorage.setItem("entry-list", emptyArray);
    location.reload();
}

window.addEventListener('DOMContentLoaded', renderUser)
window.addEventListener('DOMContentLoaded', renderEntries)
submitBtn.addEventListener('click', addEntry);
clearBtn.addEventListener('click', clearJournal)