const moment = require("moment");

exports.getAvailabilities = (events, date, numberOfDays = 7) => {
  const availabilities = new Map();
  for (let i = 0; i < numberOfDays; ++i) {
    let tmpDate = moment(date).add(i, "days");
    availabilities.set(tmpDate.format("d"), {
      date: tmpDate.toDate(),
      slots: []
    });
  }
  console.log(availabilities);
  for (const event of events) {
    for (
      let date = moment(event.starts_at);
      date.isBefore(event.ends_at);
      date.add(30, "minutes"
      )
      ) {
        let day = availabilities.get(date.format("d"));
        console.log(event, date.format("d"), day, date);
      if (event.kind === "opening" && date.isAfter(day.date) === false) {
        day.slots.push(date.format("H:mm"));
      } else if (event.kind === "appointment") {
        day.slots = day.slots.filter(
            slot => slot.indexOf(date.format("H:mm")) === -1
        );
      }
    }
  }

  return Array.from(availabilities.values())
}