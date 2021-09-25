import { compareDesc} from 'date-fns';


export type SortConfig<TOption> = {
  title: string;
  comparer: (lhs: TOption, rhs: TOption) => number;
};
