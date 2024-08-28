declare module 'react-slick' {
    import * as React from 'react';
  
    interface Settings {
      accessibility?: boolean;
      adaptiveHeight?: boolean;
      afterChange?: (currentSlide: number) => void;
      appendDots?: (dots: React.ReactNode) => JSX.Element;
      arrows?: boolean;
      asNavFor?: string | null;
      autoplay?: boolean;
      autoplaySpeed?: number;
      beforeChange?: (currentSlide: number, nextSlide: number) => void;
      centerMode?: boolean;
      centerPadding?: string;
      className?: string;
      cssEase?: string;
      customPaging?: (index: number) => JSX.Element;
      dots?: boolean;
      dotsClass?: string;
      draggable?: boolean;
      easing?: string;
      edgeFriction?: number;
      fade?: boolean;
      focusOnSelect?: boolean;
      infinite?: boolean;
      initialSlide?: number;
      lazyLoad?: 'ondemand' | 'progressive';
      nextArrow?: JSX.Element;
      pauseOnDotsHover?: boolean;
      pauseOnFocus?: boolean;
      pauseOnHover?: boolean;
      prevArrow?: JSX.Element;
      responsive?: Array<{
        breakpoint: number;
        settings: Settings | 'unslick';
      }>;
      rows?: number;
      rtl?: boolean;
      slide?: string;
      slidesPerRow?: number;
      slidesToScroll?: number;
      slidesToShow?: number;
      speed?: number;
      swipe?: boolean;
      swipeEvent?: (swipeDirection: 'left' | 'right' | 'up' | 'down') => void;
      swipeToSlide?: boolean;
      touchMove?: boolean;
      touchThreshold?: number;
      useCSS?: boolean;
      useTransform?: boolean;
      variableWidth?: boolean;
      vertical?: boolean;
      verticalSwiping?: boolean;
      waitForAnimate?: boolean;
    }
  
    export default class Slider extends React.Component<Settings> {}
  }
  