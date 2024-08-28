
import dayjs from "dayjs";
import { MouseEvent, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

type PaymentHistory = {
  USD: string;
  paymentAddress: string;
  paymentMethod: string;
  paymentSumIn: string;
  status: string;
  timestamp: string;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type HeadCell = {
  disablePadding: boolean;
  id: keyof PaymentHistory;
  label: string;
  numeric: boolean;
};
const headCells: readonly HeadCell[] = [
  {
    id: "paymentMethod",
    numeric: false,
    disablePadding: true,
    label: "Method",
  },
  {
    id: "paymentSumIn",
    numeric: false,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "paymentAddress",
    numeric: false,
    disablePadding: false,
    label: "Wallet address",
  },
  {
    id: "timestamp",
    numeric: false,
    disablePadding: false,
    label: "Time of request",
  },
];

// type EnhancedTableProps = {
//   onRequestSort: (
//     event: MouseEvent<unknown>,
//     property: keyof PaymentHistory
//   ) => void;
//   order: Order;
//   orderBy: string;
// };

// function EnhancedTableHead({
//   order,
//   orderBy,
//   onRequestSort,
// }: EnhancedTableProps) {
//   const createSortHandler =
//     (property: keyof PaymentHistory) => (event: MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   const { t } = useTranslation();

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {t(headCell.label)}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

type PaymentHistoryProps = {
  statusPayment: string | null;
};

export const PaymentHistory = ({ statusPayment }: PaymentHistoryProps) => {
  const paymentHistory: PaymentHistory[] = JSON.parse(statusPayment ?? "[]");

  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof PaymentHistory>("timestamp");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof PaymentHistory
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onChangePage = (_e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const sortedRows = paymentHistory
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const { t } = useTranslation();

  const [productList] = useState(sortedRows);
  const [rowsLimit] = useState(8);
  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [totalPage] = useState(Math.ceil(productList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = sortedRows.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = sortedRows.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  return (
    // <Box>
    //   <CustomPaper>
    //     <Toolbar
    //       sx={{
    //         pl: { sm: 2 },
    //         pr: { xs: 1, sm: 1 },
    //       }}
    //     >
    //       <Typography variant="h2" id="tableTitle" component="div">
    //         {t("Withdrawal History")}
    //       </Typography>
    //     </Toolbar>
    //     <TableContainer className="mobile-wrap">
    //       <Table className="mobile-container">
    //         <EnhancedTableHead
    //           order={order}
    //           orderBy={orderBy}
    //           onRequestSort={handleRequestSort}
    //         />
    //         <TableBody>
    //           {sortedRows.map((row, idx) => {
    //             return (
    //               <CustomTableRow hover key={idx}>
    //                 <TableCell>{row.paymentMethod}</TableCell>
    //                 <TableCell>{row.USD}$</TableCell>
    //                 <TableCell>{row.paymentAddress}</TableCell>
    //                 <TableCell>
    //                   {dayjs(row.timestamp).format(
    //                     "ddd, DD MMM YYYY hh:mm:ss a"
    //                   )}
    //                 </TableCell>
    //                 {row.status === "Waiting" ? (
    //                   <WaitingStatusCell>{row.status}</WaitingStatusCell>
    //                 ) : (
    //                   <ActiveStatusCell>{row.status}</ActiveStatusCell>
    //                 )}
    //               </CustomTableRow>
    //             );
    //           })}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <TablePagination
    //       rowsPerPageOptions={[5, 10, 25]}
    //       component="div"
    //       count={paymentHistory.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={onChangePage}
    //       onRowsPerPageChange={onChangeRowsPerPage}
    //     />
    //   </CustomPaper>
    // </Box>
    <div>
      <div className="py-4">
        <div className="flow-root shadow bg-co rounded-lg">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full pb-1 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {headCells.map((cell) => (
                      <th
                        scope="col"
                        className="py-2 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        {cell.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rowsToShow.map((row, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="whitespace-nowrap px-3 py-5 pr-2 text-sm">
                          <div className="flex items-center">
                            {/* <div className="h-11 w-11 flex-shrink-0">
                                <img
                                  alt=""
                                  src={person.image}
                                  className="h-11 w-11 rounded-full"
                                />
                              </div> */}
                            <div className="">
                              <div className="font-medium text-gray-900">
                                {row.paymentMethod}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                          <div className="text-gray-900 text-center">
                            {row.USD}$
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500  text-center">
                          {(() => {
                            switch (row.status) {
                              case "Waiting":
                                return (
                                  <span className="inline-flex items-center rounded-full bg-or px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-yellow-600/20">
                                    {row.status}
                                  </span>
                                );
                              case "Approve":
                                return (
                                  <span className="inline-flex items-center rounded-full bg-green-800 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-green-600/20">
                                    {row.status}
                                  </span>
                                );
                              case "Canceled":
                                return (
                                  <span className="inline-flex items-center rounded-full bg-red-800 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-red-600/20">
                                    {row.status}
                                  </span>
                                );
                              default:
                                return null;
                            }
                          })()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-500 text-center">
                            {row.paymentAddress}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500  text-center">
                          {dayjs(row.timestamp).format(
                            "ddd, DD MMM YYYY hh:mm:ss a"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="w-full flex justify-center sm:justify-end flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
              <div className="text-sm">
                Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                {currentPage == totalPage - 1
                  ? productList?.length
                  : (currentPage + 1) * rowsLimit}{" "}
                of {productList?.length} entries
              </div>
              <div className="flex">
                <ul
                  className="flex justify-center items-center gap-x-2 z-30"
                  role="navigation"
                  aria-label="Pagination"
                >
                  <li
                    className={` prev-btn flex items-center justify-center w-8 rounded-md h-8 border border-solid border-gray-200 disabled] ${
                      currentPage == 0
                        ? "bg-gray-200 text-gray-300 pointer-events-none"
                        : " cursor-pointer text-gray-500 "
                    }
                `}
                    onClick={previousPage}
                  >
                    <ChevronLeftIcon  className="h-8 w-8"/>
                  </li>

                  <li
                    className={`flex items-center justify-center w-8 rounded-md h-8 border border-solid border-gray-200 ${
                      currentPage == totalPage - 1
                        ? "bg-gray-200 text-gray-300 pointer-events-none"
                        : " cursor-pointer text-gray-500 "
                    }`}
                    onClick={nextPage}
                  >
                    <ChevronRightIcon className="h-8 w-8"/>
                    </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};