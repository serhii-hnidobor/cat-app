function convertDateStringToHourMinute(dateString: string) {
  const date = new Date(dateString);
  const localTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return localTime;
}

export default convertDateStringToHourMinute;
