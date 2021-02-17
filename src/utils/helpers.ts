import {
  AcquisitionResponse,
  DailyAcquisition,
  NormalizedAcqusitionData,
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

  const groupedEntries = newEntries.reduce(
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

  const total = allEntries.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.sites;
  }, 0);

  const averagePerDay = parseFloat((total / groupedEntries.length).toFixed(1));

  const minMax = `34 / 506`;

  const max =
    [...allEntries].sort((a, b) => b.sites - a.sites).shift()?.sites || 0;

  return {
    allEntries: newEntries,
    groupedEntries,
    averagePerDay,
    minMax,
    max,
    total,
  };
}
