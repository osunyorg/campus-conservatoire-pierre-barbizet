import './colors';
window.cpbm = window.cpbm || {};

window.cpbm.seasons = {
  init: function() {
    this.date = new Date();
    this.index = 0; // winter default
    this.quarter = 3; // night default

    // Get the season
    this.setCurrentSeason();
    // Get the period of the day
    this.setCurrentDayQuarter();

    this.setColors();

    this.listen();
  },
  listen: function () {
    window.addEventListener('keydown', function(e) {
      if (e.key === 's' && e.ctrlKey) {
        this.nextSeason();
      }
    }.bind(this));
  },
  nextSeason: function () {
    this.quarter += 1;

    if (this.quarter == 4) {
      this.quarter = 0;
      this.index += 1;
    }

    if (this.index == 4) {
      this.index = 0;
    }

    this.setColors();
  },
  setCurrentSeason: function () {
    var year = this.date.getFullYear(),
        season = 'winter', // Set default to winter to handle date of the year before spring
        seasonsDate = [
          { index: 1, name: 'spring', start: new Date(year, 2, 21) },
          { index: 2, name: 'summer', start: new Date(year, 5, 21) },
          { index: 3, name: 'autumn', start: new Date(year, 8, 21) },
          { index: 0, name: 'winter', start: new Date(year, 11, 21) }
        ];

    var season = 'winter';
    seasonsDate.forEach(function(seasonDate, index) {
      if (this.date >= seasonDate.start) {
        season = seasonDate.name
        this.index = seasonDate.index;
      }
    }.bind(this));

    return season;
  },
  setCurrentDayQuarter: function () {
    var quarters = [
          { index: 0, name: 'morning', hour: 6 },
          { index: 1, name: 'midday', hour: 11 },
          { index: 2, name: 'afternoon', hour: 15 },
          { index: 3, name: 'night', hour: 20 }
        ];

    quarters.forEach(function(_quarter) {
      if (this.date.getHours() >= _quarter.hour) {
        this.quarter = _quarter.index;
      }
    }.bind(this));
  },
  setColors: function () {
    var colors = window.cpbm.colors[this.index];

    document.body.style.setProperty('--season-start-color', colors[this.quarter].start);
    document.body.style.setProperty('--season-end-color', colors[this.quarter].end);
    document.body.style.setProperty('--color-accent', colors[this.quarter].accent); // define accent color
  }
};

window.cpbm.seasons.init();