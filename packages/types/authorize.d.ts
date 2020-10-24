/// <reference types="react" />
import { StandardProps } from "@tarojs/components";

export declare type AuthScope =
  | "werun"
  | "record"
  | "camera"
  | "userLocation"
  | "writePhotosAlbum"
  | "userLocationBackground";

export declare type OpenType =
  | "contact"
  | "getPhoneNumber"
  | "getUserInfo"
  | "launchApp"
  | "scope";

export declare interface AuthorizeProps extends StandardProps {
  authorize?: boolean;
  openType?: OpenType;
  authScope?: AuthScope;
  onAuthorize?: Function;
  children?: React.ReactElement | string | string[];
}

declare const Authorize: {
  (props: AuthorizeProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};
export default Authorize;
