import { __rest, __assign } from 'tslib';
import React, { useState } from 'react';
import { View, Swiper, SwiperItem, Text } from '@tarojs/components';
import Image from '@vyron/mini-components/lib/components/image';
import { isEmpty, compact, get, mergeStyle } from '@vyron/mini-components/lib/utils';

var IndicatorDots = function (props) {
    var data = props.data, style = props.style, current = props.current, className = props.className, dotActiveLine = props.dotActiveLine, indicatorColor = props.indicatorColor, wrapperClassName = props.wrapperClassName, indicatorActiveColor = props.indicatorActiveColor, restProps = __rest(props, ["data", "style", "current", "className", "dotActiveLine", "indicatorColor", "wrapperClassName", "indicatorActiveColor"]);
    return (React.createElement(View, { className: wrapperClassName }, data.map(function (__, index) {
        var isCurrent = index === current;
        var _style = mergeStyle(style, {
            backgroundColor: isCurrent ? indicatorActiveColor : indicatorColor,
        });
        return (React.createElement(View, __assign({}, restProps, { key: index, style: _style, className: "__dot__ " + (isCurrent
                ? "__dot__active__ " + (dotActiveLine ? "__dot__active__line__" : "")
                : "") + " " + (className !== null && className !== void 0 ? className : "") })));
    })));
};
var IndicatorNumber = function (props) {
    var data = props.data, current = props.current, className = props.className, wrapperClassName = props.wrapperClassName, restProps = __rest(props, ["data", "current", "className", "wrapperClassName"]);
    var extraText = get(data, "[" + current + "]._text", "");
    return (React.createElement(View, { className: wrapperClassName },
        React.createElement(View, __assign({}, restProps, { className: "__numbers__ " + (className !== null && className !== void 0 ? className : "") }),
            React.createElement(Text, null,
                current + 1,
                "/",
                data.length),
            extraText.length > 0 && (React.createElement(Text, { className: "__extra__text__" }, extraText)))));
};
var defaultIndicator = {
    indicatorType: "dots",
    indicatorPosition: "bottomCenter",
    indicatorColor: "rgba(0, 0, 0, .3)",
    indicatorActiveColor: "#000000",
};
var Indicator = function (props) {
    var _a = __assign(__assign({}, defaultIndicator), compact(props, function (v) { return typeof v === "undefined"; })), indicatorType = _a.indicatorType, indicatorPosition = _a.indicatorPosition, _b = _a.wrapperClassName, wrapperClassName = _b === void 0 ? "" : _b, restProps = __rest(_a, ["indicatorType", "indicatorPosition", "wrapperClassName"]);
    var IndicatorComponent = get({
        dots: IndicatorDots,
        numbers: IndicatorNumber,
    }, indicatorType, IndicatorDots);
    return (React.createElement(IndicatorComponent, __assign({}, restProps, { wrapperClassName: "__indicator__ __indicator__" + indicatorPosition + " " + wrapperClassName })));
};
var CarouselItem = function (props) {
    var data = props.data, onClick = props.onClick, extra = props.extra, _a = props.className, className = _a === void 0 ? "" : _a, style = props.style, restProps = __rest(props, ["data", "onClick", "extra", "className", "style"]);
    var src = (data || {}).src;
    return (React.createElement(SwiperItem, __assign({}, restProps, { key: data.id, className: "__swiper__item__ " + className, onClick: onClick === null || onClick === void 0 ? void 0 : onClick.bind(null, data) }),
        React.createElement(View, { className: "__content__" },
            React.createElement(Image, { src: src, mode: "aspectFit", errorIcon: "icon-error_img", className: "__carousel__img__" })), extra === null || extra === void 0 ? void 0 :
        extra(data)));
};
var Carousel = function (props) {
    var _a, _b;
    var data = props.data, _c = props.style, style = _c === void 0 ? "" : _c, _d = props.className, className = _d === void 0 ? "" : _d, _e = props.swiperProps, swiperProps = _e === void 0 ? {} : _e, swiperItemProps = props.swiperItemProps;
    var onChange = swiperProps.onChange, customIndicator = swiperProps.customIndicator, onClick = swiperProps.onClick, dotActiveLine = swiperProps.dotActiveLine, wrapperClassName = swiperProps.wrapperClassName, indicatorType = swiperProps.indicatorType, indicatorPosition = swiperProps.indicatorPosition, restProps = __rest(swiperProps, ["onChange", "customIndicator", "onClick", "dotActiveLine", "wrapperClassName", "indicatorType", "indicatorPosition"]);
    var carouselData = (!isEmpty(data) ? data : [{}]);
    var _f = useState((_a = swiperProps === null || swiperProps === void 0 ? void 0 : swiperProps.current) !== null && _a !== void 0 ? _a : 0), current = _f[0], setCurrent = _f[1];
    var onSwiperChange = function (eve) {
        setCurrent(eve.detail.current);
        onChange === null || onChange === void 0 ? void 0 : onChange.call(null, eve);
    };
    return (React.createElement(View, { className: "__carousel__ " + className, style: style },
        React.createElement(Swiper, __assign({}, restProps, { current: current, onChange: onSwiperChange, indicatorDots: !customIndicator && carouselData.length > 1, className: "__swiper__ " + ((_b = swiperProps === null || swiperProps === void 0 ? void 0 : swiperProps.className) !== null && _b !== void 0 ? _b : "") }), carouselData.map(function (item, index) { return (React.createElement(CarouselItem, __assign({}, swiperItemProps, { key: index, data: item, onClick: onClick }))); })), props === null || props === void 0 ? void 0 :
        props.extra, props === null || props === void 0 ? void 0 :
        props.children,
        !!(customIndicator && carouselData.length > 1) && (React.createElement(Indicator, __assign({}, {
            current: current,
            dotActiveLine: dotActiveLine,
            indicatorType: indicatorType,
            wrapperClassName: wrapperClassName,
            indicatorPosition: indicatorPosition,
            data: carouselData,
            indicatorColor: swiperProps === null || swiperProps === void 0 ? void 0 : swiperProps.indicatorColor,
            indicatorActiveColor: swiperProps === null || swiperProps === void 0 ? void 0 : swiperProps.indicatorActiveColor,
        })))));
};

export default Carousel;
//# sourceMappingURL=index.js.map
