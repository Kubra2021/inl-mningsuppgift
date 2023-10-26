export default
  class Musician {
  constructor(name, info, birthYear) {
    this.name = name;
    this.info = info;
    this.birthYear = birthYear;
    this.bands = [];
  }

  joinBand(band, joinYear, instruments) {
    this.bands.push({ band, joinYear, instruments });
  }

  leaveBand(band) {
    this.bands = this.bands.filter(bandInfo => bandInfo.band !== band);
  }
}