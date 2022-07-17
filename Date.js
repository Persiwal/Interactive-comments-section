export const FormatDate = (date) => {
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
  let formatedDate = "";

  if (timeDiff < 5) {
    formatedDate = "now";
  } else if (timeDiff < 60) {
    formatedDate = timeDiff.toFixed() + " seconds ago";
  } else if (timeDiff / 60 < 60) {
    formatedDate = (timeDiff / 60).toFixed() + " minutes ago";
  } else if (timeDiff / (60 * 60) < 24) {
    formatedDate = (timeDiff / (60 * 60)).toFixed() + " hours ago";
  } else if (timeDiff / (60 * 60 * 24) < 7) {
    formatedDate = (timeDiff / (60 * 60 * 24)).toFixed() + " days ago";
  } else if (timeDiff / (60 * 60 * 24) < 30) {
    formatedDate = (timeDiff / (60 * 60 * 24) / 7).toFixed() + " weeks ago";
  } else if (
    timeDiff / (60 * 60 * 24 * 31) > 1 &&
    timeDiff / (60 * 60 * 24 * 31) < 1.5
  ) {
    formatedDate = "about month ago";
  } else if (timeDiff / (60 * 60 * 24 * 31) < 12) {
    formatedDate =
      "about " + (timeDiff / (60 * 60 * 24 * 31)).toFixed() + " months ago";
  } else {
    formatedDate =
      "about " + (timeDiff / (60 * 60 * 24 * 31 * 12)).toFixed() + " years ago";
  }

  return formatedDate;
};
