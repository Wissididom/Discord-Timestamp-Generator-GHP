const { DateTime, Settings } = luxon;

function initialize(locale = "en") {
  // Initialize input elements with current date and time
  Settings.defaultLocale = locale;
  let now = DateTime.local().set({ millisecond: 0 });
  now = now.plus({ minutes: DateTime.local().offset }).toJSDate();
  document.getElementById("date").valueAsDate = now;
  document.getElementById("time").valueAsDate = now;
  generate(DateTime.local());
}

function fromSelected(gen) {
  let date = document.getElementById("date").valueAsDate;
  let time = document.getElementById("time").valueAsNumber;
  time /= 1000; // convert from milliseconds to seconds
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);
  let dt = DateTime.fromObject({
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Months are 1-based in Luxon
    day: date.getDate(),
    hour: hours,
    minute: minutes,
    second: seconds,
  });
  if (gen) generate(dt);
  else updateStyled(dt);
}

function generate(dt) {
  const unixTime = dt.toUnixInteger();
  document.getElementById("unix").innerHTML = Math.floor(unixTime);
  document.getElementById("code").innerHTML = `&lt;t:${
    Math.floor(unixTime)
  }&gt;`;
  document.getElementById("option1").innerHTML = dt.toLocaleString(
    DateTime.TIME_SIMPLE,
  );
  document.getElementById("option2").innerHTML = dt.toLocaleString(
    DateTime.TIME_WITH_SECONDS,
  );
  document.getElementById("option3").innerHTML = dt.toLocaleString(
    DateTime.DATE_SHORT,
  );
  document.getElementById("option4").innerHTML = dt.toLocaleString({
    ...DateTime.DATE_MED,
    month: "long",
  });
  document.getElementById("option5").innerHTML = dt.toLocaleString({
    ...DateTime.DATETIME_MED,
    month: "long",
  });
  document.getElementById("option6").innerHTML = dt.toLocaleString({
    ...DateTime.DATETIME_FULL,
    weekday: "long",
    timeZoneName: undefined,
  });
  document.getElementById("option7").innerHTML = dt.toLocaleString({
    ...DateTime.DATETIME_SHORT,
    second: undefined,
  });
  document.getElementById("option8").innerHTML = dt.toLocaleString({
    ...DateTime.DATETIME_SHORT,
    second: "2-digit",
  });
  document.getElementById("option9").innerHTML = dt.toRelative();
  updateStyled(dt);
}

function updateStyled(dt) {
  const unixTime = dt.toUnixInteger();
  document.getElementById("styledCode").innerHTML = `&lt;t:${
    Math.floor(unixTime)
  }:${document.getElementById("style").value}&gt;`;
}
