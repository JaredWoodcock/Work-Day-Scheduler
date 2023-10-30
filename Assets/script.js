$(function () {
  
  $(".saveBtn").on("click", function() {
    var timeBlockID = $(this).parent().attr("id");
    var textValue = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockID, textValue);
  });

  
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

  
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var storedText = localStorage.getItem(timeBlockId);

    if (storedText) {
      $(this).find("textarea").val(storedText);
    }
  });
  

  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
  

});
