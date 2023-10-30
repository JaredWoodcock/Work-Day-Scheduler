$(function () {
  
  // This function is a click function where when you click on the save button, it saves the ID attribute and the text that is in the textarea to local storage. It also then calls the saveNotification function. 
  $(".saveBtn").on("click", function() {
    var timeBlockID = $(this).parent().attr("id");
    var textValue = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockID, textValue);

    saveNotification("Event Saved ✔️");
  });

  // This function starts by setting the currentHour variable. 
  // Then, it looks at the time-block class, finds the ID of it, splits the "hour-x" to grab just the number. 
  // Then if it is less than the currentHour, it puts the past class on it, same hour puts the present class, the coming hours get the future class. 
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // This function looks for storedText in the local storage, so that upon page refresh, it will still populate what the user had saved before. 
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var storedText = localStorage.getItem(timeBlockId);

    if (storedText) {
      $(this).find("textarea").val(storedText);
    }
  });
  
  // This function displays the currentDate in the p element that has the currentDay ID.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
  
  // This function creates an Event Saved message that pops up whenever the user clicks the save button. 
  // It gets called whenever the click event occurs in the first function listed.
  function saveNotification(message) {
    $("#notification").text(message)
    $("#notification").fadeIn().delay(2000).fadeOut();
  }

});
