const months = {
  "01": "January",
  "02": "Febuary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const convertTimeStamp = (timestamp: String) => {
  const year = timestamp.substring(0, 4);
  const month = months[timestamp.substring(5, 7) as keyof typeof months];
  const day = timestamp.substring(8, 10);

  return month + " " + day + " " + year;
};
