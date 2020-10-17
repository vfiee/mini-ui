import { IconProps } from "./index";

export declare type EmptyType = "empty" | "network" | "error";

export declare interface EmptyProps {
  image?: EmptyType | IconProps;
  className?: string;
  description?: string;
  children?: string | React.ReactElement;
  onClick?: Function;
}

declare type DefaultIconProps = {
  [key: string]: IconProps;
};
