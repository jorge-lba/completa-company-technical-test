class DateProvider {
  constructor() {
    if (this.constructor === DateProvider) {
      throw new TypeError('DateProvider is abstract class');
    }
  }

  addDays() {
    throw new TypeError('Not implemented');
  }
}

export { DateProvider };
