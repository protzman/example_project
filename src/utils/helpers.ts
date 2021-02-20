import {
  AcquisitionResponse,
  DailyAcquisition,
  NormalizedAcqusitionData,
  NormalizedAcquisition,
  PerDayAcquisition,
} from '../types';

/**
 * use this method to generate statistics on all acquisition entries
 * @param acquisitions list of AcquisitionResponse objects coming from the api
 */
export function normalizeAcquisitions(
  acquisitions: AcquisitionResponse[]
): NormalizedAcqusitionData {
  // sort data and turn timestamps into dates
  let allEntries = acquisitions.sort((a, b) => a.timestamp - b.timestamp) || [];

  const normalizedEntries = allEntries.map((item) => {
    const originDate = new Date(item.timestamp * 1000);

    const timezoneDifference = originDate.getTimezoneOffset() / 60;
    const correctedDate = new Date(
      originDate.setHours(originDate.getHours() - timezoneDifference)
    );

    const groupedDate = new Date(item.timestamp * 1000);
    groupedDate.setHours(0, 0, 0, 0);

    const normalizedEntry: NormalizedAcquisition = {
      sites: item.sites,
      date: correctedDate.toISOString(),
      groupedDate: groupedDate.toISOString(),
    };
    return normalizedEntry;
  });

  const groupedEntries = normalizedEntries.reduce(
    (accumulator: DailyAcquisition[], currentValue) => {
      const found = accumulator.find(
        (item) => item.date === currentValue.groupedDate
      );
      if (found) {
        found.sites = found.sites + currentValue.sites;
        found.total = found.total + 1;
      } else {
        accumulator.push({
          date: currentValue.groupedDate,
          total: 1,
          sites: currentValue.sites,
        });
      }
      return accumulator;
    },
    []
  );

  const perDayEntries = normalizedEntries.reduce(
    (accumulator: PerDayAcquisition[], currentValue) => {
      const dayFound = accumulator.find(
        (item) => item.date === currentValue.groupedDate
      );
      if (dayFound) {
        dayFound.acquisitions.push(currentValue);
      } else {
        const acquistion: PerDayAcquisition = {
          date: currentValue.groupedDate,
          acquisitions: [currentValue],
        };
        accumulator.push(acquistion);
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
    normalizedEntries,
    groupedEntries,
    perDayEntries,
    averagePerDay,
    minMax,
    total,
  };
}
