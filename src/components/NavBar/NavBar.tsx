import { FC } from "react";
import { IconButton } from "../Button";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";

import styles from "./NavBar.module.css";

type NavBarProps = {};

export const NavBar: FC<NavBarProps> = (props) => {
  const icon = (
    <DonutSmallIcon
      className={styles.button}
      fontSize={"large"}
      style={{ color: "f4faf6" }}
    />
  );
  return (
    <div className={styles.container}>
      <IconButton icon={icon} />
    </div>
  );
};
