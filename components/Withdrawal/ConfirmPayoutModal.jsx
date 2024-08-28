// components/ConfirmPayoutModal.js
"use client";
import { useState } from "react";

const ConfirmPayoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  minFee,
  estimated,
  t,
  selectedPaymentMethod,
  errorWallet,
  addressPayment,
  onAddressChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal">
        {/* {loading && <LoaderMini />} */}
        <div className="close" onClick={onClose}>
          {" "}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.44487 24L24 8.02771M8 8L23.5551 23.9723"
              stroke="#15143D"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="column">
          <p>
            {"Withdrawal commission:"}{" "}
            {minFee ? minFee.fee.toFixed(6).replace(/\.?0+$/, "") : ""}{" "}
            {estimated.currency_to}. <br></br>
            {"You will receive"}{" "}
            {(estimated.estimated_amount - minFee.fee)
              .toFixed(6)
              .replace(/\.?0+$/, "")}{" "}
            {estimated.currency_to} {"in your wallet."}
            <br></br>
            {"Enter your wallet details and click ‘Withdraw Funds’"}
          </p>
        </div>

        <div className="column">
          <label htmlFor="wallet">
            {"Wallet Address"} {selectedPaymentMethod}
          </label>
          <input
            type="text"
            name="wallet"
            id="wallet"
            placeholder="Enter wallet address"
            required=""
            className={`column-input ${errorWallet ? "error" : ""}`}
            value={addressPayment} // Используйте пропс для значения
            onChange={(e) => onAddressChange(e.target.value)}
          />
          {errorWallet && (
            <span className="error-span">{"Your address is not valid"}</span>
          )}
        </div>
        {/* <button className="btn btn-primary btn-modal" onClick={validateAddress}>
          {t("Send Request")}
        </button> */}
      </div>
      <button onClick={onClose}>Close</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmPayoutModal;
