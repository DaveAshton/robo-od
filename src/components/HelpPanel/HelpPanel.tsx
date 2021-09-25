import { FC } from "react";

import styles from "./HelpPanel.module.css";

type HelpPanelProps = {
  isOpen: boolean;
  openKeys: string[];
  closeKeys: string[];
};

export const HelpPanel: FC<HelpPanelProps> = ({
  children,
  isOpen,
  openKeys,
  closeKeys,
}) => {
  return (
    <div className={styles.container}>

      {isOpen && (
        <div className={styles.welcome}>
          Search for boat to start pursuit calculation
        </div>
      )}
      {children}
      <KeyHelp isOpen={isOpen} keys={isOpen ? closeKeys : openKeys} />
    </div>
  );
};
  
const Key = ({ keyTitle }: { keyTitle: string }) => (
  <div className={styles.key}>{keyTitle}</div>
);

const KeyHelp = ({ keys, isOpen }: { keys: string[]; isOpen: boolean }) => {
  const keyList = keys.map((k) => <Key key={k} keyTitle={k} />);
  return (
    <div className={styles.keys}>
      Press {keyList} to {isOpen ? "close" : "open"}
    </div>
  );
};
