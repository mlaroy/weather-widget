# Weather Widget
A combination of [Bootstrap's Weather Icons](http://erikflowers.github.io/weather-icons) and Yahoo's Weather API.

While the entire icon font is included, this application only uses a subset of the icons based on the weather codes provided by [Yahoo's API](https://developer.yahoo.com/weather/documentation.html#codes)

## Usage
Make sure to include the stylesheet which references the font files:

```
<link rel="stylesheet" src="weather-icons.css">
```

and initialize the weather after including the JavaScript. The function takes a [WOEID](http://woeid.rosselliot.co.nz/lookup/) (Where On Earth IDentifier) parameter as a string.

```
<script src="weather.js"></script>
<script>
    const vancouver = '9807';
    weather( vancouver );
</script>
```


### Notes
Make sure you read about [rate limits](https://developer.yahoo.com/weather/#ratelimits) and [attribution guidelines](https://developer.yahoo.com/attribution/)