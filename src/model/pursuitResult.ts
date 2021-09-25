
import { BoatClass } from "./boatClass";

export type PursuitResult = {
  id: string;
  boatClass: BoatClass;
  startOffsetSeconds: number;
  startTime?: Date;
  formattedStart?: string;
};

export const defaultPursuitResultComparer = (lhs: PursuitResult, rhs: PursuitResult): number => {
    return lhs.startOffsetSeconds - rhs.startOffsetSeconds;
};
