// "use client";
// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import Loader from "./Loader";
// import { CalendarCheck, Play, Eye } from "phosphor-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useTopBrands } from "./useBrands";
// import { useTopBrandsFilter } from "@/components/useBrands";

// import {
//   extractReviewBonus,
//   extractReviewImage,
//   extractLink,
//   extractBadge,
//   extractPros,
// } from "./brandUtils";
// import useSWR from "swr";

// export default function NewBrands() {
//   const { t } = useTranslation();
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [source, setSource] = useState("");
//   useEffect(() => {
//     const defLng = localStorage.getItem("country");
//     // setSelectedBrand(defLng);
//     if (defLng) {
//       const foundBrand = navigateBrands.find(
//         (brand) => brand.slug === defLng.toLowerCase()
//       );
//       const foundBrandPartners = navigateBrandsPartners.find(
//         (brand) => brand.slug === defLng.toLowerCase()
//       );
//       if (foundBrand || foundBrandPartners) {
//         const newSource = localStorage.getItem("source");
//         setSelectedBrand(
//           newSource === "partner1039" ? foundBrandPartners : foundBrand
//         );
//       } else {
//         // Если локаль не найдена, устанавливаем "all"
//         const allBrand = navigateBrands.find((brand) => brand.slug === "all");
//         const allBrandPartners = navigateBrandsPartners.find(
//           (brand) => brand.slug === "all"
//         );
//         const newSource = localStorage.getItem("source");
//         setSelectedBrand(newSource === "partner1039" ? allBrandPartners : allBrand);
//       }
//     }
//   }, []);

//   const navigateBrands = [
//     {
//       topCurrentCategories: 222,
//       brand: 220,
//       icon: "🌍",
//       slug: "all",
//     },
//     {
//       topCurrentCategories: 223,
//       brand: 220,
//       icon: "🇦🇺",
//       slug: "au",
//     },
//     {
//       topCurrentCategories: 224,
//       brand: 220,
//       icon: "🇨🇦",
//       slug: "ca",
//     },
//     {
//       topCurrentCategories: 228,
//       brand: 220,
//       icon: "🇫🇮",
//       slug: "fi",
//     },
//     {
//       topCurrentCategories: 226,
//       brand: 220,
//       icon: "🇩🇪",
//       slug: "de",
//     },
//     {
//       topCurrentCategories: 231,
//       brand: 220,
//       icon: "🇳🇿",
//       slug: "nz",
//     },
//     {
//       topCurrentCategories: 230,
//       brand: 220,
//       icon: "🇳🇴",
//       slug: "no",
//     },
//     {
//       topCurrentCategories: 232,
//       brand: 220,
//       icon: "🇵🇱",
//       slug: "pl",
//     },
//   ];
//   const navigateBrandsPartners = [
//     {
//       topCurrentCategories: 250,
//       brand: 249,
//       icon: "🌍",
//       slug: "all",
//     },
//     {
//       topCurrentCategories: 251,
//       brand: 249,
//       icon: "🇦🇺",
//       slug: "au",
//     },
//     {
//       topCurrentCategories: 224,
//       brand: 249,
//       icon: "🇨🇦",
//       slug: "ca",
//     },
//     {
//       topCurrentCategories: 228,
//       brand: 249,
//       icon: "🇫🇮",
//       slug: "fi",
//     },
//     {
//       topCurrentCategories: 226,
//       brand: 249,
//       icon: "🇩🇪",
//       slug: "de",
//     },
//     {
//       topCurrentCategories: 231,
//       brand: 249,
//       icon: "🇳🇿",
//       slug: "nz",
//     },
//     {
//       topCurrentCategories: 230,
//       brand: 249,
//       icon: "🇳🇴",
//       slug: "no",
//     },
//     {
//       topCurrentCategories: 232,
//       brand: 249,
//       icon: "🇵🇱",
//       slug: "pl",
//     },
//   ];

//   useEffect(() => {
//     const url = typeof window !== "undefined" ? window.location.href : "";
//     const urlObj = typeof window !== "undefined" ? new URL(url) : null;

//     const searchParams = new URLSearchParams(urlObj.search);
//     searchParams.delete("brand");

//     const currentKeyword = searchParams.get("keyword");

//     if (currentKeyword !== null && currentKeyword.includes("partner1039")) {
//       // Если в строке есть "partner1039" или "partner1041", вырезаем и добавляем в setSource
//       const partnerIndex = currentKeyword.indexOf("partner");
//       const partnerText = currentKeyword.substring(
//         partnerIndex,
//         partnerIndex + 11
//       ); // 11 - длина "partner1039" или "partner1041"
//       setSource(partnerText);

//       // Используем "partner1039" или "partner1041" в newUrl
//       searchParams.set("source", partnerText);
//     } else {
//       // Если "partner1039" или "partner1041" отсутствует, добавляем 0 в setSource
//       setSource("0");
//       searchParams.set("source", "0");
//       // Если "partner1039" или "partner1041" отсутствует, новый URL не содержит source
//       // searchParams.delete("source");
//     }
//   }, []);
//   const { data: languageDetails, error: detailsError } = useSWR(
//     "languageDetails",
//     null,
//     {
//       fallbackData: selectedBrand
//         ? {
//             flag: selectedBrand.icon,
//             brand: selectedBrand.brand,
//             topBrand: selectedBrand.topCurrentCategories,
//           }
//         : { flag: "🌍", brand: 221, topBrand: 222 },
//     }
//   );

//   if (typeof window !== "undefined") {
//     const newSource = localStorage.getItem("source");
//     const urlBrands = newSource === "partner1039" ? 248 : 221;

//     if (urlBrands && typeof window !== "undefined") {
//       localStorage.setItem("newbrands", urlBrands);
//     }
//   }
//   let br;
//   if (typeof window !== "undefined") {
//    br = localStorage.getItem("newbrands");
//   }
//   const filteredBrands = useTopBrandsFilter(
//     br,
//     languageDetails.topBrand
//   );


//   const [isLoading, setIsLoading] = useState(false);

//   const handleLinkClick = () => {
//     setIsLoading(true);

//     // Simulate some delay to show the loader (remove this in actual usage)
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

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
//     <>
//       <div className="main__container pb-6">
//         <div className="heading flex items-center">
//           <h2>Fresh Entrants to the Online Casino Scene 2024</h2>
//         </div>
//         <div className="flex flex-col px-0 py-6 wrap-mobile">
//           {filteredBrands.map((brand) => {
//             const reviewImgSrc = extractReviewImage(brand.content.rendered);
//             const playLink = extractLink(brand.content.rendered);

//             return (
//               <div
//                 className="flex flex-wrap mb-2 card-brand-new justify-between"
//                 key={brand.id}
//               >
//                 <div className="brandImage p-3">
//                   <Link key={brand.id} href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}>
//                     <Image
//                       src={reviewImgSrc}
//                       alt={brand.title.rendered}
//                       width={120}
//                       height={60}
//                       loading="lazy"
//                     />
//                   </Link>
//                 </div>
//                 <Link
//                   className="flex basis-[16%] items-center p-3"
//                   key={brand.id}
//                   href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                 >
//                   <span>{brand.title.rendered}</span>
//                 </Link>
//                 <div
//                   className="basis-[15%] flex items-center"
//                   dangerouslySetInnerHTML={{
//                     __html: extractReviewBonus(brand.content.rendered),
//                   }}
//                 />
//                 <div
//                   className="flex basis-[11%] items-center"
//                   dangerouslySetInnerHTML={{
//                     __html: extractBadge(brand.content.rendered),
//                   }}
//                 />
//                 <div
//                   className="flex basis-[25%] py-2 items-center ml-3"
//                   dangerouslySetInnerHTML={{
//                     __html: extractPros(brand.content.rendered),
//                   }}
//                 />
//                 <div className="buttons basis-[17%] ml-auto p-3 flex items-center">
//                   <Link
//                     className="btn btn-primary mb-1 flex justify-center items-center w-full"
//                     href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                     target="_blank"
//                   >
//                     <Play className="mb-1 mr-1" size={24} />
//                     Play Now
//                   </Link>
//                   {/* <Link
//                     className="btn btn-secondary flex justify-center items-center w-full"
//                    href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                     onClick={handleLinkClick}
//                   >
//                     {isLoading ? (
//                       <Loader />
//                     ) : (
//                       <Eye className="mr-2" size={20} />
//                     )}
//                    Read Review
//                   </Link> */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }
