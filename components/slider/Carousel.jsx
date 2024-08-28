import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

export default function Carroussel(props) {
  const [Carousel, setCarousel] = useState(null);
  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(0);
  const [cards, setCards] = useState([]);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const loadCarousel = async () => {
      const DynamicCarousel = await dynamic(() =>
        import("react-spring-3d-carousel")
      );
      setCarousel(() => DynamicCarousel);
    };

    loadCarousel();
  }, []);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  useEffect(() => {
    const table = props.cards.map((element, index) => {
      return { ...element, onClick: () => setGoToSlide(index) };
    });
    setCards(table);
  }, [props.cards, setGoToSlide]);

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setGoToSlide((prevSlide) => (prevSlide + 1) % props.cards.length);
      }, 5000); // Смена слайда каждые 3 секунды
    };

    startAutoScroll();

    return () => {
      clearInterval(autoScrollRef.current);
    };
  }, [props.cards.length]);

  const handleMouseEnter = () => {
    clearInterval(autoScrollRef.current);
  };

  const handleMouseLeave = () => {
    autoScrollRef.current = setInterval(() => {
      setGoToSlide((prevSlide) => (prevSlide + 1) % props.cards.length);
    }, 5000);
  };

  if (!Carousel) {
    return null; // Мы рендерим пустоту, если Carousel еще не загружен
  }

  let xDown = null;
  let yDown = null;

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches; // browser API // jQuery
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    clearInterval(autoScrollRef.current); // Остановка автопрокрутки при касании
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        setGoToSlide((prevSlide) => (prevSlide + 1) % props.cards.length);
      } else {
        setGoToSlide(
          (prevSlide) =>
            (prevSlide - 1 + props.cards.length) % props.cards.length
        );
      }
    }
    xDown = null;
    yDown = null;

    autoScrollRef.current = setInterval(() => {
      setGoToSlide((prevSlide) => (prevSlide + 1) % props.cards.length);
    }, 5000); // Возобновление автопрокрутки после завершения касания
  };

  return (
  
      <div
        style={{
          width: props.width,
          height: props.height,
          margin: props.margin,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <Carousel
          slides={cards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={showArrows}
          className="proverka"
        />
      </div>
  
  );
}
