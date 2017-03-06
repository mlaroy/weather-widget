function weather( cityId, el ) {

  const container = document.getElementById(el);
  const forecast = document.getElementById('forecast');
  const list = document.getElementById('locations');
  let t;

  function setupEventBindings() {
    let search = document.getElementById('search');
    search.addEventListener('keyup', function(e){
      e.preventDefault();
      clearTimeout(t);
      t = setTimeout( getLocations( this.value ), 200 );
    })
  }

  function clearLocations() {
    list.innerHTML = '';
  }

  function buildWeatherQuery( cityId ) {
    const base_url = 'http://query.yahooapis.com/v1/public/yql';
    const query = encodeURIComponent(`select * from weather.forecast where woeid=${cityId} AND u="c"`);
    const query_url = `${base_url}?q=${query}&format=json`;

    return query_url;
  }

  function buildLocationQuery( searchTerm ){
    let now = new Date();
    let base_url = 'http://query.yahooapis.com/v1/public/yql';
    let query = encodeURIComponent(`select * from geo.places where text="${searchTerm}"`);
    let apiQuery = base_url + '?q='+ query +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json';

    return apiQuery;
  }

  function getLocations( searchTerm ){
    let query = buildLocationQuery( searchTerm );
    // send request to Yahoo
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', query, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == '200') {
        // console.log('data', xhr.responseText);
        showLocations(xhr.responseText);
      }
    };
    xhr.send();
  }

  function showLocations(data){
    let locations = JSON.parse(data);
    list.innerHTML = '';
    if (locations.query.results !== null) {
      let places = locations.query.results.place;
      if( Array.isArray(places)) {
        places.forEach( item => {
          let country = (item.country.content) ? item.country.content : '';
          let name = item.name;
          let admin = (item.admin1) ? item.admin1.content +', ' : '';
          let woeid = item.woeid;
          let li = document.createElement('li');
          let link = document.createElement('a');
          link.href = woeid;
          link.innerHTML = `${name}, ${admin}${country}`;
          link.addEventListener('click', function(e){
            e.preventDefault();
            getWeatherData( woeid );
          })
          li.appendChild(link)
          list.appendChild(li);
        })
      }
    }
    console.log(locations);
  }

  function getWeatherData( cityId ) {
    let query = buildWeatherQuery( cityId );
    // send request to Yahoo
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', query, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == '200') {
        render(xhr.responseText);
      }
    };
    xhr.send();
  }

  function render(weatherData){
    const weather = JSON.parse(weatherData);
    const iconsData = icons;
    const forecastData = weather.query.results.channel.item.forecast;
    const description = weather.query.results.channel.item.description;
    const condition = weather.query.results.channel.item.condition;
    const location = weather.query.results.channel.location;
    const astronomy = weather.query.results.channel.astronomy;

    const result = iconsData['codes'].filter(function(item){
      return item.number == condition.code;
    });

    container.innerHTML = `<h2>${location.city}, ${location.region}</h2>`

    // current weather
    let today = document.createElement('div');
    today.classList.add('block', 'today');
    today.innerHTML = `<i class="wi ${result[0].class}"></i>
        <div class="weather type-small">
          <h3>Today</h3>
          <p>Currently ${condition.temp} &deg;C., and ${result[0].description}</p>
          <p>
            Sunrise: ${astronomy.sunrise} <br>
            Sunset: ${astronomy.sunset}
          </p>
        </div>`;
    container.append(today);

    // clear forecast data
    forecast.innerHTML = '';

    // forecast
    forecastData.forEach( (day) => {
      let iconclass = iconsData['codes'].filter(function(item){
        return item.number == day.code;
      });
      let newDay = document.createElement('div');
      newDay.classList.add('block');
      newDay.innerHTML = `<div class="weather type-small">
        <i class="wi ${iconclass[0].class}"></i>
        <h4>${day.day}, ${day.date}</h4>
        <p>${day.text}</p>
        <ul>
          <li>High: ${day.high} &deg;C.</li>
          <li>Low: ${day.low} &deg;C.</li>
        </ul>
        </div>
      </div>`;
      forecast.append(newDay);
    });
  }

  // initialize
  setupEventBindings();
  // start with default city it
  getWeatherData( cityId );
}