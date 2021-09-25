import { ChangeEventHandler, useEffect, useRef } from "react";
import classNames from "classnames";
import { ReactComponent as DogLogo } from "../../images/logo.svg";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onChange: (input: string) => void;
  onClickOutside: () => void;
  isBusy?: boolean;
};

export const SearchInput = ({
  value,
  placeholder,
  onChange,
  onClickOutside,
  isBusy,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    onChange(ev.target.value);
  };

  // useEffect(() => {
  //   const handleMouseDown = (event: MouseEvent): void => {
  //     if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
  //       console.log("bluring..");
  //       onClickOutside();
  //     }
  //   };

  //   window.addEventListener(EVENT, handleMouseDown);
  //   return () => {
  //     window.removeEventListener(EVENT, handleMouseDown);
  //   };
  // }, [onClickOutside]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <DogLogo
        className={classNames(styles.logo, { [styles.loading]: isBusy })}
      />
    </div>
  );
};
