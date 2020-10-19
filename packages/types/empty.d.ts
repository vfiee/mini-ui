/// <reference types="react" />
import { IconProps } from "./index";

export declare type EmptyType = "empty" | "network" | "error";

export declare interface EmptyProps {
  image?: EmptyType | IconProps;
  className?: string;
  description?: string;
  children?: string | React.ReactElement;
  onClick?: Function;
}

export declare type DefaultIconProps = {
  [key: string]: IconProps;
};

declare const Empty: {
  (props: EmptyProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};
export default Empty;
