"use client";
import Styles from "./Card.module.css";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Card({ imagen, link, bonus }) {
  const { t } = useTranslation();
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    borderRadius: 2,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrl = localStorage.getItem("savedUrl");
      setNewUrl(savedUrl);
    }
  }, []);

  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Link
        className="target-top-brand"
        href={`${link}/${newUrl}&creative_id=XXL_TOP_Brand`}
        target="_blank"
      >
        <Image
          width={300}
          height={150}
          loading="lazy"
          src={imagen}
          alt={bonus}
          className="target-top-brand"
        />
      </Link>
      <div className="tobbb">
        <div className="review-bonus bb">{bonus}</div>
      </div>
      <div className={Styles.btnn}>
        <Link
          className="btn btn-primary target-top-brand"
          href={`${link}/${newUrl}&creative_id=XXL_TOP_Brand`}
          target="_blank"
        >
          {t("Play Now")}
        </Link>
      </div>
    </animated.div>
  );
}

export default Card;
