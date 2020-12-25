/// <reference types="react" />
import { StandardProps } from "@tarojs/components";
import { FunctionComponent } from "./index";

declare type AuthScope =
  | "werun"
  | "record"
  | "camera"
  | "userLocation"
  | "writePhotosAlbum"
  | "userLocationBackground";

declare type OpenType =
  | "contact"
  | "getPhoneNumber"
  | "getUserInfo"
  | "launchApp"
  | "scope";

declare interface AuthorizeProps extends StandardProps {
  authorize?: boolean;
  openType?: OpenType;
  authScope?: AuthScope;
  onAuthorize?: Function;
  children?: React.ReactNode;
}

declare const Authorize: FunctionComponent<AuthorizeProps>;

export { Authorize, AuthorizeProps, OpenType, AuthScope };
