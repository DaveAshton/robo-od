
import { memo } from "react";
import classnames from "classnames";
import { SortConfig } from "./sorting";
import styles from "./SortSelector.module.css";

type SortSelectorProps<TOption> = {
  onClick: (config: SortConfig<TOption>) => void;
  config: SortConfig<TOption>[];
  active: string;
};

export function SortSelector<TOption>({
  onClick,
  config,
  active,
}: SortSelectorProps<TOption>) {

  const buttons = config.map((conf) => {
    const cls = active === conf.title ? styles.active : styles.inactive;
    return (
      <button
        key={conf.title}
        className={classnames(styles.button, cls)}
        onClick={() => onClick(conf)}
      >
        {conf.title}
      </button>
    );
  });
  return <div className={styles.container}>{buttons}</div>;
};
