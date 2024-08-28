// import React, { useState, useEffect } from "react";
// import { useTopBrands } from "./useBrands";
// import BrandSearchContainer from "./BrandSearchContainer";
// import { MagnifyingGlass } from "phosphor-react";
// import Link from "next/link";
// import { extractReviewBonus, extractReviewTitle } from "./brandUtils";
// import { useDispatch } from "react-redux";
// import Loader from "./Loader";
// import { setShowBrandsAsync, clearShowBrands } from "./brandsActions";
// import { useTranslation } from 'react-i18next';

// const SearchBrands = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showBrands, setShowBrands] = useState([]);
//   const [overlayActive, setOverlayActive] = useState(false);
//   const allBrands = useTopBrands(33);
//   const [isLoading, setIsLoading] = useState(false);



//   const handleOverlayClick = () => {
//     // dispatch(clearShowBrands());
//     // setSearchQuery("");
//     setShowBrands([]);
//     setOverlayActive(false);
//   };

//   const handleEnterClick = () => {
//     setShowBrands([]);
//     // setSearchQuery("");
//     setOverlayActive(false);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleSearch = () => {
//     const filteredBrands = allBrands.filter((brand) =>
//       (
//         extractReviewBonus(brand.content.rendered) &&
//         extractReviewTitle(brand.content.rendered)
//       )
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     );
  
//     setShowBrands(filteredBrands);
//     dispatch(setShowBrandsAsync(filteredBrands));
//   };
  
//   useEffect(() => {
//     handleSearch();
//     if (searchQuery === "") {
//       setShowBrands([]);
//       dispatch(clearShowBrands());
//     }
//   }, [searchQuery]);
  

//   return (
//     <div className="search">
//       <div className="relative">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search brands..."
//           onClick={() => setOverlayActive(true)}
//           style={{ zIndex: overlayActive ? 1000 : "auto" }}
//         />
//          {isLoading ? (
//                 <Loader />
//               ) : (
//                 <>
       
//           <MagnifyingGlass size={20} className="absolute right-2 top-2" color="#fff" />
       
//         </>
//               )}
//       </div>
//       {overlayActive && (
//         <div className="overlay" onClick={handleOverlayClick}></div>
//       )}
//       <div className="search-header-results ">
//         <BrandSearchContainer  showBrands={showBrands} />
     
//       </div>
//     </div>
//   );
// };

// export default SearchBrands;