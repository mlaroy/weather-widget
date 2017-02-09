function weather( cityId, el ) {

  const container = document.getElementById(el);
  const base_url = 'http://query.yahooapis.com/v1/public/yql';
  const yql_query = encodeURIComponent(`select * from weather.forecast where woeid=${cityId} AND u="c"`);
  const yql_query_url = `${base_url}?q=${yql_query}&format=json`;

  // send request to Yahoo
  let xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', yql_query_url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      getCurrentWeather(xhr.responseText);
    }
  };
  xhr.send();


  function getCurrentWeather(data){

    let weatherData = JSON.parse(data);

    // get local json of weather codes
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'weathercodes.json', true);

    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == '200') {
        render(weatherData, xobj.responseText);
      }
    };
    xobj.send();
  }

  function render(weather, icons){
    const iconsData = JSON.parse(icons);
    const description = weather.query.results.channel.item.description;
    const condition = weather.query.results.channel.item.condition;
    const result = iconsData['codes'].filter(function(item){
      return item.number == condition.code;
    });

    container.innerHTML = `<p class="weather type-small">
      <i class="wi ${result[0].class}"></i>
      Currently ${condition.temp} &deg;C., and ${result[0].description} in Vancouver</p>`;
  }
}