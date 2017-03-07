# Weather Widget
A combination of [Bootstrap's Weather Icons](http://erikflowers.github.io/weather-icons) and Yahoo's Weather API.

While the entire icon font is included, this application only uses a subset of the icons based on the weather codes provided by [Yahoo's API](https://developer.yahoo.com/weather/documentation.html#codes)

## Usage
Make sure to include the stylesheet which references the font files:

```
<link rel="stylesheet" src="weather-icons.css">
```

and initialize the weather after including the JavaScript. The function takes a [WOEID](http://woeid.rosselliot.co.nz/lookup/) (Where On Earth IDentifier) parameter as a string to display a default location, as well as the ID of the element into which you wish to inject your widget.

```
<div id="weather"></div>

<script src="weather.js"></script>
<script>
    const vancouver = '9807';
    weather( vancouver, 'weather' );
</script>
```

See in [in action](http://weather.mikelaroy.ca/).

### Notes
Make sure you read about [rate limits](https://developer.yahoo.com/weather/#ratelimits) and [attribution guidelines](https://developer.yahoo.com/attribution/)


### Release Notes
This started as an experiment. Without an official release as of yet, I'm hoping to release version 1.0 as it is, with a little refinement. I'm aiming for version 2.0 to be a React app.