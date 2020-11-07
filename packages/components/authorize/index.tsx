import React, { useMemo, useCallback } from "react";
import { Button } from "@tarojs/components";
import { isFunction, ensureAuthScope } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthorizeProps } from "types";

function authorizeScope(eve: any) {
  this.authScope &&
    ensureAuthScope(this.authScope)
      .then(() => {
        this.onAuthorize && this.onAuthorize({ authorized: true }, eve);
      })
      .catch((err) => {
        this.onAuthorize &&
          this.onAuthorize({ authorized: false, error: err }, eve);
      });
}

function onSuccess(fn: Function, ...args: any) {
  isFunction(fn) && fn(...args);
}

const OPENTYPE_EVENTNAME = {
  contact: "onContact",
  launchApp: "onLaunchapp",
  getUserInfo: "onGetUserInfo",
  getPhoneNumber: "onGetPhoneNumber",
};

const Authorize = (props: AuthorizeProps) => {
  const {
    authorize,
    onAuthorize,
    authScope,
    className = "",
    openType,
    ...rest
  } = props;
  const onClick = useCallback(
    (eve: any) => {
      if (props.openType === "scope") {
        authorizeScope.call(props, eve);
      }
    },
    [props]
  );
  const buttonProps = useMemo(
    (...args) => {
      const fn = onSuccess.bind(null, onAuthorize, ...args);
      let _props = {};
      if (authorize) {
        _props = { onClick: fn };
      } else {
        const eventName = openType && OPENTYPE_EVENTNAME[openType];
        _props = {
          openType,
        };
        if (eventName) {
          _props[eventName] = fn;
        } else {
          _props["onClick"] = onClick;
        }
      }
      return _props;
    },
    [openType, authorize, onClick, onAuthorize]
  );

  return (
    // @ts-ignore
    <Button {...rest} {...buttonProps} className={`__authorize__ ${className}`}>
      {props.children}
    </Button>
  );
};

Authorize.displayName = "Authorize";

Authorize.options = {
  addGlobalClass: true,
};

export default Authorize;
