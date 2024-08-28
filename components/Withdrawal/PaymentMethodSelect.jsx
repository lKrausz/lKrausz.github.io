// components/PaymentMethodSelect.js
import React from "react";
import Select from "react-select";

const PaymentMethodSelect = ({
  coins,
  selectedPaymentMethod,
  handlePaymentMethodChange,
}) => {
  return (
    <Select
      options={Object.values(coins.selectedCurrencies).map((item) => ({
        value: item,
        label: (
          <div className="option-select">
            <img
              src={`./${item}.png`} // Замените на путь к вашим изображениям
              alt={item}
              style={{ width: "24px", marginRight: "8px" }}
            />
            {item}
          </div>
        ),
      }))}
      value={{
        value: selectedPaymentMethod,
        label: (
          <div className="option-select">
            <img
              src={`./${selectedPaymentMethod}.png`} // Замените на путь к вашим изображениям
              alt={selectedPaymentMethod}
              style={{ width: "24px", marginRight: "8px" }}
            />
            {selectedPaymentMethod}
          </div>
        ),
      }}
      onChange={(selectedOption) =>
        handlePaymentMethodChange({
          target: { value: selectedOption.value },
        })
      }
      isSearchable={false}
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "7px",
          maxHeight: "36px",
          minWidth: "226px",
        }),
      }}
    />
  );
};

export default PaymentMethodSelect;
