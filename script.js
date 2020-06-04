const updateTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const setDay = date.getDay();
  // const setYear = new getYear();

  const day = [];
  const month = [];

  day[0] = "Sunday";
  day[1] = "Monday";
  day[2] = "Tuesday";
  day[3] = "Wednesday";
  day[4] = "Thursday";
  day[5] = "Friday";
  day[6] = "Saturday";

  month[1] = "Jan";
  month[2] = "Feb";
  month[3] = "Mar";
  month[4] = "Apr";
  month[5] = "May";
  month[6] = "Jun";
  month[7] = "Jul";
  month[8] = "Aug";
  month[9] = "Sept";
  month[10] = "Oct";
  month[11] = "Nov";
  month[12] = "Dec";

  const dayOfWeek = day[date.getDay()];
  const monthOfYear = month[date.getMonth()];

  document.querySelector(".time-and-day").textContent = `${
    hour > 10 ? `${hour}` : `0${hour}`
  }:${
    minutes > 10 ? `${minutes}` : `0${minutes}`
  } - ${dayOfWeek}, ${setDay} ${monthOfYear} '20`;

  //Update time every 1 second.
  setInterval(() => {
    updateTime();
  }, 1000);
};

const searchLocation = e => {
  let userValue = convertFirstLetter(
    document.querySelector("#location-search").value
  );
  let markup = `<li class="last-search">${userValue}</li>`;
  let li = Array.from(document.querySelectorAll(".history-location>li"));
  weather(userValue);
  if (li.length > 3) {
    var parent = document.querySelector(".history-location");
    parent.removeChild(parent.lastElementChild);
    document
      .querySelector(".history-location")
      .insertAdjacentHTML("afterbegin", markup);
    document.querySelector("#location-search").value = "";
  } else {
    document
      .querySelector(".history-location")
      .insertAdjacentHTML("afterbegin", markup);
    document.querySelector("#location-search").value = "";
  }
  e.preventDefault();
};

const searchLocationOnEnter = e => {
  if (e.which === 13 || e.keyCode === 13) {
    let userValue = convertFirstLetter(
      document.querySelector("#location-search").value
    );
    let markup = `<li id="last-search">${userValue}</li>`;
    let li = Array.from(document.querySelectorAll(".history-location>li"));
    weather(userValue);
    if (li.length > 3) {
      var parent = document.querySelector(".history-location");
      parent.removeChild(parent.lastElementChild);
      document
        .querySelector(".history-location")
        .insertAdjacentHTML("afterbegin", markup);
      document.querySelector("#location-search").value = "";
    } else {
      document
        .querySelector(".history-location")
        .insertAdjacentHTML("afterbegin", markup);
      document.querySelector("#location-search").value = "";
    }
    e.preventDefault();
  } else {
    return;
  }
};

const searchlastlocation = e => {
  let location = e.target.innerHTML;
  console.log(location);
  e.preventDefault();
};

const convertFirstLetter = location => {
  return location.charAt(0).toUpperCase() + location.slice(1);
};

const timeConversion = timeZone => {
  let hours = timeZone / 3600;
  if (hours > 0) {
    return `(GMT+${hours})`;
  } else return `(GMT${hours})`;
};

const weather = weatherLocation => {
  const apiKey = "217950bab440438454227ca390eef25b";
  const location = weatherLocation;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const { main, name, sys, weather, wind, timezone } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      document.querySelector(".location-of-weather").textContent = `${name}`;
      document.querySelector(".temp").textContent = `${Math.round(main.temp)}°`;
      document.querySelector(
        ".weather-icon"
      ).innerHTML = `<img src=${icon} alt=${weather[0]["main"]} height= "70px">
            <p>${weather[0]["description"]}</p>`;
      document.querySelector(".wind-level").textContent = `${wind.speed}km/h`;
      document.querySelector(
        ".humidity-level"
      ).textContent = `${main.humidity}%`;
      document.querySelector(
        ".feels-like-level"
      ).textContent = `${main.feels_like.toFixed(1)}°`;
      document.querySelector(
        ".condition-level"
      ).textContent = `${weather[0]["description"]}`;
      document.querySelector(
        ".location-country"
      ).textContent = `${sys.country}`;
      document.querySelector(".timezone-level").textContent = timeConversion(
        timezone
      );
      document.querySelector(
        ".max-temp-level"
      ).textContent = `${main.temp_max}`;
      document.querySelector(
        ".min-temp-level"
      ).textContent = `${main.temp_min}`;
    })
    .catch(error => {
      alert("Enter a valid location.");
    });
};

//load Event Listeners
document.querySelector(".icon").addEventListener("click", searchLocation);
document
  .querySelector("#location-search")
  .addEventListener("keypress", searchLocationOnEnter);

document
  .querySelectorAll("#last-search")
  .forEach(item => item.addEventListener("click", searchlastlocation));

updateTime();
