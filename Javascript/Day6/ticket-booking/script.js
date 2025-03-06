let selectedRowData = null;

function selectRowData(radio) {
    const row = radio.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    selectedRowData = {
        trainNumber: cells[1].innerHTML,
        trainName: cells[2].innerHTML,
        source: cells[3].innerHTML,
        destination: cells[4].innerHTML,
        travelClass: cells[5].innerHTML,
        price: cells[6].innerHTML,
    };

    console.log("selected train:", selectedRowData);
}

function storeData() {
    if (selectedRowData) {
        localStorage.setItem(
            "SelectedTrainData",
            JSON.stringify(selectedRowData)
        );
        alert("Train Data saved");
        console.log("Stored Data", selectedRowData);
        window.location.href = "passenger-details.html";
    } else {
        alert("Select a train before proceeding");
    }
}
