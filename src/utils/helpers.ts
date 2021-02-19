import {
  AcquisitionResponse,
  DailyAcquisition,
  NormalizedAcqusitionData,
  PerDayAcquisition,
} from './types';

/**
 * use this method to generate statistics on all acquisition entries
 * @param acquisitions list of AcquisitionResponse objects coming from the api
 */
export function normalizeAcquisitions(
  acquisitions: AcquisitionResponse[]
): NormalizedAcqusitionData {
  // sort data and turn timestamps into dates
  let allEntries = acquisitions.sort((a, b) => a.timestamp - b.timestamp) || [];

  const newEntries = allEntries.map((item) => {
    const dateObj = new Date(item.timestamp * 1000) || '';
    const groupedDate = new Date(item.timestamp * 1000);
    groupedDate.setHours(0, 0, 0);

    return {
      sites: item.sites,
      date: dateObj.toISOString(),
      groupedDate: groupedDate.toISOString(),
    };
  });

  const perDayEntries: PerDayAcquisition[] = [];

  const groupedEntries = newEntries.reduce(
    (accumulator: DailyAcquisition[], currentValue) => {
      const found = accumulator.find(
        (item) => item.date === currentValue.groupedDate
      );
      if (found) {
        found.sites = found.sites + currentValue.sites;
        found.total = found.total + 1;

        // find the record in the perDayEntries and push this 'curreentValue' to the acquisitions array
        const dayFound = perDayEntries.find(
          (item) => item.date === currentValue.groupedDate
        );
        dayFound?.acquisitions.push(currentValue);
      } else {
        accumulator.push({
          date: currentValue.groupedDate,
          total: 1,
          sites: currentValue.sites,
        });

        // new entry in the perDay entries array - add date and push the 'currentValue' to it
        const perDayAcquisition: PerDayAcquisition = {
          date: currentValue.groupedDate,
          acquisitions: [currentValue],
        };
        perDayEntries.push(perDayAcquisition);
      }
      return accumulator;
    },
    []
  );

  const total = allEntries.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.sites;
  }, 0);

  const averagePerDay = parseFloat((total / groupedEntries.length).toFixed(1));

  const minimum = groupedEntries.reduce((accumulator, currentValue) => {
    return currentValue.sites < accumulator ? currentValue.sites : accumulator;
  }, groupedEntries[0].sites);

  const maximum = groupedEntries.reduce((accumulator, currentValue) => {
    return currentValue.sites > accumulator ? currentValue.sites : accumulator;
  }, groupedEntries[0].sites);

  const minMax = `${minimum} / ${maximum}`;

  return {
    allEntries: newEntries,
    groupedEntries,
    perDayEntries,
    averagePerDay,
    minMax,
    total,
  };
}
