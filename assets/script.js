var currentTime = document.getElementById('#currentDay');

currentTime = moment();
$("#currentDay").text(currentTime.format("dddd, MMMM Do"));

var workDay = [
    {
        id: "0",
        time: "08",
        hour: "8",
        meridiem: "am",
        reminder: ""


    },
    {
        id: "1",
        time: "09",
        hour: "9",
        meridiem: "am",
        reminder: ""


    },
    {
        id: "2",
        time: "10",
        hour: "10",
        meridiem: "am",
        reminder: ""


    },
    {
        id: "3",
        time: "11",
        hour: "11",
        meridiem: "am",
        reminder: ""


    },
    {
        id: "4",
        time: "12",
        hour: "12",
        meridiem: "pm",
        reminder: ""


    },
    {
        id: "5",
        time: "13",
        hour: "1",
        meridiem: "pm",
        reminder: ""


    },
    {
        id: "6",
        time: "14",
        hour: "2",
        meridiem: "pm",
        reminder: ""


    },
    {
        id: "7",
        time: "15",
        hour: "3",
        meridiem: "pm",
        reminder: ""


    },
];

function storeReminders() {
    localStorage.setItem("workDay", JSON.stringify(workDay))
};

function showReminders(){
    workDay.forEach(function (thisHour){
        $(`#${thisHour.id}`).val(thisHour.reminder);
    })
};

function displayStored(){
    var storedData = JSON.parse(localStorage.getItem('workDay'));

    if (storedData) {workDay = storedData;}

    storeReminders();
    showReminders();
};

workDay.forEach(function(anHour) {
    var hourRow = $('<form>').attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hour = $("<div>")
    .text(`${anHour.hour}${anHour.meridiem}`)
    .attr({
        "class": "col-md-2 hour"
    });

    var hourData = $('<div>').attr({
        'class': 'col-md-9 description p-0'
    });

    var reminderData = $("<textarea>");
    hourData.append(reminderData);
    reminderData.attr("id", anHour.id);

    if (anHour.time < moment().format('HH')){
        reminderData.attr({'class': 'col-md-12 past'});

    } else if (anHour.time === moment().format('HH')) {
        reminderData.attr({'class': 'col-md-12 present'});

    } else if (anHour.time > moment().format('HH')) {
        reminderData.attr({'class': 'col-md-12 future'});
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>");
    var saveData = $('<button>').attr({'class': ' col-1 saveBtn'});

    saveData.append(saveButton);
    hourRow.append(hour, hourData, saveData);

});

displayStored();

$(".saveBtn").on('click', function(event){
    event.preventDefault();
    var reminderIndex = $(this).siblings(".description").children(".future").attr("id");
    workDay[reminderIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log([reminderIndex].reminder);
    storeReminders();
    showReminders();
});

