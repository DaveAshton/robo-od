import { addSeconds, format } from "date-fns";
import {
  BoatClass,
  PursuitResult,
  defaultPursuitResultComparer,
} from "../../model";

export const calculatePursuitResults = (
  boats: BoatClass[],
  raceLengthSecs: number = 90 * 60,
  raceStart: Date
): Promise<PursuitResult[]> => {
  return new Promise((resolve) => {
    if (boats?.length < 1) {
      resolve([]);
    }
    const slowestPY = boats.reduce((acc, boat) => {
      return boat.number > acc.number ? boat : acc;
    }, boats[0])?.number;

    const calculated = boats
      .map((boatClass) => {
        const startOffsetSeconds =
          raceLengthSecs - (boatClass.number / slowestPY) * raceLengthSecs;
        const startTime = addSeconds(raceStart, startOffsetSeconds);
        const formattedStart = format(startTime, 'HH:mm:ss')
        return {
          id: boatClass.className,
          boatClass,
          startOffsetSeconds,
          startTime,
          formattedStart
        };
      })
      .sort(defaultPursuitResultComparer);
    resolve(calculated);
  });
};
