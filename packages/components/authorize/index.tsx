import React from "react";
import { login } from "@tarojs/taro";
import { Button } from "@tarojs/components";
import { isFunction, isPromise, ensureAuthScope } from "utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthorizeProps, AuthorizeService, PromiseFn, Service } from "types";

const SUCCESS_MSG = {
  getPhoneNumber: "getPhoneNumber:ok",
  getUserInfo: "getUserInfo:ok",
};

async function getService(
  service: AuthorizeService,
  param: object = {}
): Promise<any> {
  if (service === void 0) {
    throw `service is undefined!`;
  }
  if (isPromise(service)) {
    return (service as PromiseFn)(param);
  }
  let { params, fn, needMiniCode, codeKey } = service as Service;
  params = {
    ...params,
    ...param,
  };
  if (needMiniCode) {
    params[codeKey || "code"] = await login();
  }
  return fn(params);
}

async function onGetPhoneNumber(eve: any) {
  const { errMsg, ...rest } = eve.detail;
  if (errMsg !== SUCCESS_MSG.getPhoneNumber) {
    return;
  }
  try {
    let userinfo = await getService(this.service, rest);
    // dispatch({type:"userinfo/update",payload:{userinfo}});
    onSuccess.bind(this, userinfo, eve)();
  } catch (error) {}
}

async function onGetUserInfo(eve: any) {
  const { errMsg, ...rest } = eve.detail;
  if (errMsg !== SUCCESS_MSG.getUserInfo) {
    return;
  }
  try {
    let userinfo = await getService(this.service, rest);
    // dispatch({type:"userinfo/update",payload:{userinfo}});
    onSuccess.bind(this, userinfo, eve)();
  } catch (error) {}
}

function authorizeScope(eve: any) {
  ensureAuthScope(this.authScope)
    .then(() => {
      this.onAuthorize && this.onAuthorize(eve);
    })
    .catch(() => {
      console.log(`未授权:${this.authScope}`);
    });
}

function onSuccess(...args: any) {
  isFunction(this.onAuthorize) && this.onAuthorize(...args);
}

const Authorize = (props: AuthorizeProps) => {
  const { authorize, onAuthorize, className = "", openType, ...rest } = props;
  function onClick(eve: any) {
    if (!openType) return;
    const openTypeFns = {
      contact: onSuccess.bind(props),
      launchApp: onSuccess.bind(props),
      scope: authorizeScope.bind(props),
      getUserInfo: onGetUserInfo.bind(props),
      getPhoneNumber: onGetPhoneNumber.bind(props),
    };

    if (!isFunction(openTypeFns[openType])) return;
    openTypeFns[openType](eve);
  }
  return (
    <React.Fragment>
      {!authorize ? (
        // @ts-ignore
        <Button
          {...rest}
          openType={openType}
          onClick={onClick}
          onContact={onClick}
          onLaunchapp={onClick}
          onGetUserInfo={onClick}
          onGetPhoneNumber={onClick}
          className={`__authorize__ ${className}`}
        >
          {props?.children}
        </Button>
      ) : (
        // @ts-ignore
        <Button
          {...rest}
          openType=""
          onClick={(eve) => onAuthorize && onAuthorize(eve)}
          className={`__authorize__ ${className}`}
        >
          {props?.children}
        </Button>
      )}
    </React.Fragment>
  );
};

Authorize.options = {
  addGlobalClass: true,
};

export default Authorize;
