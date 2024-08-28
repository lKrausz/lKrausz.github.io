// "use client";
// import React, {useState, useEffect} from "react";
// import { useTranslation } from "react-i18next";

// import { Play, Eye } from "phosphor-react";
// import Image from "next/image";
// import Link from "next/link";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useTopBrands } from "./useBrands";
// import { useTopBrandsFilter } from "@/components/useBrands";
// import useSWR from "swr";

// import {
//   extractReviewBonus,
//   extractReviewImage,
//   extractLink,
// } from "./brandUtils";

// const CarouselSlider = ({ slides }) => {
//   const { t } = useTranslation();
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   useEffect(() =>{
//     const defLng = localStorage.getItem("country");
//     // setSelectedBrand(defLng);
//     if (defLng) {
//       const foundBrand = navigateBrands.find((brand) => brand.slug === defLng.toLowerCase());
//       if (foundBrand) {
//         setSelectedBrand(foundBrand);
//       } else {
//         // Если локаль не найдена, устанавливаем "all"
//         const allBrand = navigateBrands.find((brand) => brand.slug === "all");
//         setSelectedBrand(allBrand);
//       }
//     }
//   }, []);
//   const navigateBrands = [
//     {
//       currentCategories: 138,
//       topCurrentCategories: 213,
//       icon: "🌍",
//       slug: "all",
//     },
//     {
//       currentCategories: 143,
//       topCurrentCategories: 184,
//       icon: "🇦🇺",
//       slug: "au",
//     },
//     {
//       currentCategories: 119,
//       topCurrentCategories: 84,
//       icon: "🇧🇷",
//       slug: "br",
//     },
//     {
//       currentCategories: 120,
//       topCurrentCategories: 46,
//       icon: "🇨🇦",
//       slug: "ca",
//     },
//     {
//       currentCategories: 121,
//       topCurrentCategories: 43,
//       icon: "🇫🇮",
//       slug: "fi",
//     },
//     {
//       currentCategories: 122,
//       topCurrentCategories: 45,
//       icon: "🇩🇪",
//       slug: "de",
//     },
//     {
//       currentCategories: 123,
//       topCurrentCategories: 47,
//       icon: "🇳🇿",
//       slug: "nz",
//     },
//     {
//       currentCategories: 124,
//       topCurrentCategories: 44,
//       icon: "🇳🇴",
//       slug: "no",
//     },
//     {
//       currentCategories: 125,
//       topCurrentCategories: 48,
//       icon: "🇵🇱",
//       slug: "pl",
//     },
//   ];

//   const { data: languageDetails, error: detailsError } = useSWR(
//     "languageDetails",
//     null,
//     {
//       fallbackData: selectedBrand
//         ? { flag: selectedBrand.icon, allBrand: selectedBrand.currentCategories, topBrand: selectedBrand.topCurrentCategories }
//         : { flag: "🌍", allBrand: 138, topBrand: 213 }
//     }
//   );
//   const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   const slidesData = useTopBrandsFilter(213, languageDetails.allBrand);
//   const [newUrl, setNewUrl] = useState("");
//   // Чтение сохраненной ссылки из локального хранилища
//   useEffect(() => {
//     const savedUrl = localStorage.getItem("savedUrl");

//     // Установка новой ссылки в состояние
//     if (savedUrl) {
//       setNewUrl(savedUrl);
//     }
//   }, []);
//   return (
//     <div className="brand-slider mb-6">
//       <h4 className="mb-3">Reccomend brands for you</h4>
//       <Slider {...settings}>
//         {slidesData.map((slide, index) => {
//           const reviewImgSrc = extractReviewImage(slide.content.rendered);
//           const playLink = extractLink(slide.content.rendered);

//           return (
//             <div className="card-brand" key={index}>
//               <div className="brandImage p-3">
//                 <Link key={slide.id} href={`/bonuses/${slide.id}`}>
//                   <Image
//                     src={reviewImgSrc}
//                     alt={slide.title.rendered}
//                     width={150}
//                     height={75}
//                     loading="lazy"
//                   />
//                 </Link>
//               </div>
//               <div className="brandContent p-3">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: extractReviewBonus(slide.content.rendered),
//                   }}
//                 />
//                 <div className="buttons">
//                   {/* <Link
//                     className="btn btn-secondary flex justify-center items-center mb-1"
//                     href={`/bonuses/${slide.id}`}
//                   >
//                     <Eye className="mr-1 mb-1" size={20} />
//                     Read Review
//                   </Link> */}
//                   <Link
//                     className="btn btn-primary flex justify-center items-center mt-1"
//                     href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                     target="_blank"
//                   >
//                     <Play className="mr-1 mb-1" size={20} />
//                     Play Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// };

// export default CarouselSlider;
