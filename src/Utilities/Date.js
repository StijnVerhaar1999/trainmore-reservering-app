export const getFullDate = () => {
  let dates = [];
  let today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  var x;
  for (x = 0; x < 5; x++) {
    let nextDay = new Date(today);

    nextDay.setDate(today.getDate() + x);

    let yyyy = nextDay.getFullYear();
    let mm = nextDay.getMonth() + 1;
    let dd = nextDay.getDate();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    let fullDate = yyyy + "-" + mm + "-" + dd;
    dates.push(fullDate);
  }
  return dates;
};
