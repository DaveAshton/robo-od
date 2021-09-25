import styles from "./Button.module.css";
import { FC } from "react";
import classnames from 'classnames';
import { SvgIcon, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={classnames(styles.myButton, props.className)}
    />
  );
};

export type IconButtonProps = ButtonProps & {
    icon: React.ReactElement<OverridableComponent<SvgIconTypeMap<{}, "svg">>>;
}
export const IconButton: FC<IconButtonProps> = props => {

    return (
        <Button {...props}>
            {props.icon}
        </Button>
    );
  };