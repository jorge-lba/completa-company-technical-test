import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DateProvider } from '../DateProvider.js';

dayjs.extend(utc);

class DayjsDateProviderImp extends DateProvider {
  constructor() {
    super();
  }

  addDays(days) {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayjsDateProviderImp };
