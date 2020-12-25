import React, { useMemo, useCallback, useRef } from "react";
import { Button } from "@tarojs/components";
import { isFunction, ensureAuthScope, createBEM } from "utils";
import { AuthorizeProps, FunctionComponent } from "types";

function authorizeScope(eve: any) {
  this.authScope &&
    ensureAuthScope(this.authScope)
      .then(() => {
        this.onAuthorize && this.onAuthorize({ authorized: true }, eve);
      })
      .catch(err => {
        this.onAuthorize &&
          this.onAuthorize({ authorized: false, error: err }, eve);
      });
}

function onSuccess(fn: Function, ...args: any) {
  isFunction(fn) && fn(...args);
}

const OPENABLE = {
  contact: "onContact",
  launchApp: "onLaunchapp",
  getUserInfo: "onGetUserInfo",
  getPhoneNumber: "onGetPhoneNumber"
};

const Authorize: FunctionComponent<AuthorizeProps> = props => {
  const {
    authorize,
    onAuthorize,
    authScope,
    className = "",
    openType,
    ...rest
  } = props;
  const { current: bem } = useRef(createBEM("authorize"));
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
        const eventName = openType && OPENABLE[openType];
        _props = {
          openType
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
    <Button
      {...rest}
      {...buttonProps}
      className={`${bem("authorize")} ${className}`}
    >
      {props.children}
    </Button>
  );
};

Authorize.displayName = "Authorize";

Authorize.options = {
  addGlobalClass: true
};

export default Authorize;
