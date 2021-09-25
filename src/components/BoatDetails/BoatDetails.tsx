import { useState, memo } from "react";
import { Button } from "../Button";
import styles from "./BoatDetails.module.css";

type BoatDetailsProps = {
  name: string;
  pyNumber: number;
  onAddClick: () => void;
};

export const BoatDetails = memo(
  ({ name, pyNumber, onAddClick }: BoatDetailsProps) => {
    const [isHovered, updateIsHovered] = useState(false);
    const handleMousEnter = () => {
      updateIsHovered(true);
    };
    const handleMousExit = () => {
      updateIsHovered(false);
    };
    return (
      <div
        className={styles.doggoItem}
        onMouseEnter={handleMousEnter}
        onMouseLeave={handleMousExit}
      >
        {/* <img className={styles.image} src={imageUrl} alt="" /> */}
        <span>{name}</span>
        <span className={styles.birthday}>{pyNumber}</span>
        {<DoggoButtons onAddClick={onAddClick} />}
      </div>
    );
  }
);

const DoggoButtons = (props: { onAddClick: () => void }) => {
  return (
    <div className={styles.buttons}>
      <Button onClick={props.onAddClick} className={styles.button}>Add</Button>

    </div>
  );
};
