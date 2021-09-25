import { memo } from "react";
import styles from "./SearchList.module.css";

export type SearchlistProps<TOption> = {
  options: TOption[];
  renderOption: (option: TOption) => React.ReactNode;
  keyGetter: (option: TOption) => string;
};

function SearchlistRenderer<TOption>({
  options,
  renderOption,
  keyGetter,
}: SearchlistProps<TOption>) {
  const results = options.map((option) => (
    <li key={keyGetter(option)}>{renderOption(option)}</li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.resultList}>{results}</ul>
    </div>
  );
};

export const Searchlist = memo(SearchlistRenderer) as typeof SearchlistRenderer;
