let trainInfo = document.getElementById("trainDetails");
let trainInfoText = trainInfo.getElementsByTagName("p");
let form = document.getElementById("passengerDetails");
let passengerInfo = document.getElementById("passengerDetails");
let passengerInfoText = passengerInfo.getElementsByTagName("p");

let passengerDetails = null;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let passengerName = document.querySelector('input[name="name"]').value;
    let passengerAge = document.querySelector('input[name="age"]').value;
    let passengerGender = document.querySelector('input[name="gender"]').value;

    passengerDetails = {
        name: passengerName,
        age: passengerAge,
        gender: passengerGender,
    };
    console.log(passengerDetails);
    savePassengerDetails(passengerDetails);
});

function savePassengerDetails(passengerDetails) {
    if (passengerDetails) {
        localStorage.setItem(
            "PassengerDetails",
            JSON.stringify(passengerDetails)
        );
        window.location.href = "booking-details.html";
    } else {
        alert("Enter Passenger Details");
    }
}

function trainDetails() {
    const selectedTrainData = JSON.parse(
        localStorage.getItem("SelectedTrainData")
    );
    console.log(selectedTrainData);

    trainInfoText[1].innerHTML = selectedTrainData.trainNumber;
    trainInfoText[3].innerHTML = selectedTrainData.trainName;
    trainInfoText[5].innerHTML = selectedTrainData.source;
    trainInfoText[7].innerHTML = selectedTrainData.destination;
    trainInfoText[9].innerHTML = selectedTrainData.travelClass;
    trainInfoText[11].innerHTML = selectedTrainData.price;
}

function ticketDetails() {
    const selectedTrainData = JSON.parse(
        localStorage.getItem("SelectedTrainData")
    );

    trainInfoText[1].innerHTML = selectedTrainData.trainNumber;
    trainInfoText[3].innerHTML = selectedTrainData.trainName;
    trainInfoText[5].innerHTML = selectedTrainData.source;
    trainInfoText[7].innerHTML = selectedTrainData.destination;
    trainInfoText[9].innerHTML = selectedTrainData.travelClass;
    trainInfoText[11].innerHTML = selectedTrainData.price;

    const passengerDetails = JSON.parse(
        localStorage.getItem("PassengerDetails")
    );

    passengerInfoText[1].innerHTML = passengerDetails.name;
    passengerInfoText[3].innerHTML = passengerDetails.age;
    passengerInfoText[5].innerHTML = passengerDetails.gender;
}
