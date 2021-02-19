import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import {
  AcquisitionResponse,
  DailyAcquisition,
  NormalizedAcqusitionData,
  NormalizedAcquisition,
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

  const normalizedEntries = allEntries.map((item, idx) => {
    console.log(`---${idx}`);
    let dateObj = new Date(item.timestamp * 1000);
    let groupedDate = new Date(item.timestamp * 1000);
    groupedDate.setHours(1, 1, 1, 1);
    console.log(dateObj.toString());
    console.log(groupedDate.toString());
    const normalizedEntry: NormalizedAcquisition = {
      sites: item.sites,
      date: dateObj.toISOString(),
      groupedDate: groupedDate.toISOString(),
    };
    console.log(normalizedEntry);
    return normalizedEntry;
  });

  // const perDayEntries: PerDayAcquisition[] = [];

  const groupedEntries = normalizedEntries.reduce(
    (accumulator: DailyAcquisition[], currentValue) => {
      const found = accumulator.find(
        (item) => item.date === currentValue.groupedDate
      );
      if (found) {
        found.sites = found.sites + currentValue.sites;
        found.total = found.total + 1;

        /**
         * Go through the per day entries array and find an entry where the date field is equal
         * to the currentValue's grouped date field. if you find it, push the currentValue to the
         * perDayValue.acquisions array
         */
        // const dayFound = perDayEntries.find(
        //   (item) => item.date === currentValue.groupedDate
        // );
        // dayFound?.acquisitions.push(currentValue);

        // ---------------------------------------------------------------------------------------
      } else {
        accumulator.push({
          date: currentValue.groupedDate,
          total: 1,
          sites: currentValue.sites,
        });

        // new entry in the perDay entries array - add date and push the 'currentValue' to it
        /**
         * assuming that you didnt find one in the first pass above, you should create a PerDayAcquisition
         * object and push it to the perDayentries array with the date as the currentValue.groupedDate, and
         * the first acquisition as the currentValue
         */
        // const perDayAcquisition: PerDayAcquisition = {
        //   date: currentValue.groupedDate,
        //   acquisitions: [currentValue],
        // };
        // perDayEntries.push(perDayAcquisition);

        // ---------------------------------------------------------------------------------------
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
