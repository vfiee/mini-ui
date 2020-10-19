/// <reference types="react" />
import { StandardProps } from "@tarojs/components";

export declare type PromiseFn = (args?: any) => Promise<any>;

export declare type Service = {
  params: object;
  fn: PromiseFn;
  needMiniCode?: boolean;
  codeKey?: string;
};

export declare type AuthScope =
  | "userInfo"
  | "address"
  | "invoice"
  | "werun"
  | "record"
  | "camera"
  | "userLocation"
  | "invoiceTitle"
  | "writePhotosAlbum";

export declare type AuthorizeService = PromiseFn | Service;

export declare type OpenType =
  | "contact"
  | "getPhoneNumber"
  | "getUserInfo"
  | "launchApp"
  | "scope";

export declare interface AuthorizeProps extends StandardProps {
  authorize: boolean;
  openType?: OpenType;
  authScope?: AuthScope;
  children?: React.ReactElement | string;
  onAuthorize?: Function;
  service?: AuthorizeService;
}

declare const Authorize: {
  (props: AuthorizeProps): JSX.Element;
  options: {
    addGlobalClass: boolean;
  };
};
export default Authorize;
