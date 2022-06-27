export const TransformDate = (date) => {
  let month = date.getMonth().toString();
  let day = date.getDate().toString();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const formatedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formatedDate;
};

export const CalculateTimeAgo = (oldDate) => {
  const [date, dayTime] = oldDate.split(" ");
  const [oldYear, oldMonth, oldDay] = date.split("-");
  const [oldHours, oldMinutes, oldSeconds] = dayTime.split(":");
  const timeDiffInMiliseconds =
    new Date() -
    new Date(oldYear, oldMonth, oldDay, oldHours, oldMinutes, oldSeconds);
  const timeDiff = timeDiffInMiliseconds / 1000; // time diff in seconds
  let outputString = "";

  if (timeDiff < 5) {
    outputString = "now";
  } else if (timeDiff < 60) {
    outputString = timeDiff.toFixed() + " seconds ago";
  } else if (timeDiff / 60 < 60) {
    outputString = (timeDiff / 60).toFixed() + " minutes ago";
  } else if (timeDiff / (60 * 60) < 24) {
    outputString = (timeDiff / (60 * 60)).toFixed() + " hours ago";
  } else if (timeDiff / (60 * 60 * 24) < 7) {
    outputString = (timeDiff / (60 * 60 * 24)).toFixed() + " days ago";
  } else if (timeDiff / (60 * 60 * 24) < 30) {
    outputString = (timeDiff / (60 * 60 * 24) / 7).toFixed() + " weeks ago";
  } else if (
    timeDiff / (60 * 60 * 24 * 31) > 1 &&
    timeDiff / (60 * 60 * 24 * 31) < 1.5
  ) {
    outputString = "about month ago";
  } else if (timeDiff / (60 * 60 * 24 * 31) < 12) {
    outputString =
      "about " + (timeDiff / (60 * 60 * 24 * 31)).toFixed() + " months ago";
  } else {
    outputString =
      "about " + (timeDiff / (60 * 60 * 24 * 31 * 12)).toFixed() + " years ago";
  }

  return outputString;
};
