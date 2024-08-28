// "use client";
// import React, {useState, useEffect} from "react";
// import { Play, Eye } from "phosphor-react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   extractReviewBonus,
//   extractReviewImage,
//   extractLink,
// } from "./brandUtils";

// export default function BrandSearchContainer({ showBrands }) {

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
//     <div>
//       {showBrands.length > 0 && (
//         <ul className="p-6 snap-mandatory snap-y max-h-96 search-containers flex flex-wrap">
//           {showBrands.map((brand) => {
//             const playLink = extractLink(brand.content.rendered); // Извлекаем playLink

//             return (
//               <li
//                 className="p-3 mb-2 flex flex-col snap-start basis-[24%] search-result"
//                 key={brand.id}
//               >
//                 <Image
//                   className="ml-auto mr-auto mb-2 w-auto"
//                   src={extractReviewImage(brand.content.rendered)}
//                   alt={brand.title.rendered}
//                   width={150}
//                   height={75}
//                   loading="lazy"
//                 />
//                 <h4 className="text-slate-200">{brand.title.rendered}</h4>
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: extractReviewBonus(brand.content.rendered),
//                   }}
//                 />
//                 <div className="buttons">
//                   {/* <Link
//                     className="btn btn-secondary flex justify-center items-center mb-1"
//                    href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                   >
//                     <Eye className="mr-1" size={20} />
//                     Read Review
//                   </Link> */}
//                   <Link
//                     className="btn btn-primary flex justify-center items-center mt-1"
//                     href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
//                     target="_blank"
//                   >
//                     <Play className="mr-2" size={20} />
//                     Play Now
//                   </Link>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }
