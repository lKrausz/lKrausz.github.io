import * as React from "react";
import { useState, useEffect } from "react";
import { updateUserStatusPayment } from "@/components/getUser/pushPayment";
import { TextMobileStepper } from "@/components/products/Stepper";
import { useQueryUser } from "@/queries";
import Image from "next/image";
import { useTranslation } from "react-i18next";
// import { sendData } from "@/components/sendDataToSlack/sendData";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

export default function MediaCard(props) {
  function cleanJson(jsonString) {
    return jsonString.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  }
  const { lang, item, onFinish } = props;
  const [open, setOpen] = useState(false);
  const descriptions = JSON.parse(cleanJson(item.product_description));
  const { t } = useTranslation();

  const descriptionForLang =
    descriptions.find((desc) => desc[lang]) ||
    descriptions.find((desc) => desc["all"]);

  const {
    data: user,
    loading: userLoading,
    error: userError,
    errorMessage: userErrorMessage,
    refetch: refetchUser,
  } = useQueryUser();

  const onConfirm = async () => {
    const status_payment = JSON.stringify({
      status: "Waiting",
      timestamp: new Date().toISOString(),
      paymentMethod: item.product_name,
      paymentSumIn: item.products_amount,
      paymentAddress: email,
      USD: item.products_amount,
    });

    const body = JSON.stringify({
      id: user.id,
      status_payment,
      sumMinus: item.products_amount,
    });
    const withdrawalData = {
      id: user.id,
      amount: item.products_amount,
      paymentMethod: item.product_name,
    };

    try {
      const response = await updateUserStatusPayment(body);
      // await sendData(withdrawalData);

      // window.location.reload();
      console.log("response", response);
    } catch (e) {
      console.error("ERROR - onConfirm:", e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full">
      {/* <div className="card flex flex-nowrap w-full justify-between items-center">
        <Image
          className=" flex"
          src={`/products/${item.product_image}.jpg`}
          alt={item.product_name}
          width={96}
          height={74}
        />
        <div className="basis-8/12 card-content flex">
          <div className="flex justify-between basis-3/12 mr-3">
            <p className="mr-3 flex items-center"> {item.product_name}</p>
            <p className="flex items-center">{item.products_amount}$</p>
          </div>
          <p className="basis-8/12 ml-auto dm-none flex items-center">
            {" "}
            <span>{descriptionForLang[lang] || descriptionForLang["all"]}</span>
          </p>
        </div>
        <Button
          onClick={handleOpen}
          className="btn-primary btn basis-1/12"
          variant="contained"
          size="small"
          disabled={
            userLoading || !user || +user.balance < +item.products_amount
          }
        >
          {t("Buy")}
        </Button>
      </div> */}
      <div className="shadow rounded-lg">
        <div className="bg-ard rounded-md px-6 py-5 sm:flex sm:items-center sm:justify-between ">
          <h4 className="sr-only">Visa</h4>
          <div className="sm:flex sm:items-center">
            <Image
              className=" flex rounded-lg w-16"
              src={`/products/${item.product_image}.jpg`}
              alt={item.product_name}
              width={96}
              height={74}
            />
            <div className="mt-3 sm:ml-4 sm:mt-0">
              <div className="text-sm font-semibold text-gray-900">
                {item.product_name}
                <span aria-hidden="true" className="mx-2 inline">
                  &middot;
                </span>
                <span className="inline-flex items-center rounded-full bg-or px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-indigo-500/10">
                  {item.products_amount}$
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                <span>
                  {descriptionForLang[lang] || descriptionForLang["all"]}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
            <button
              type="button"
              onClick={handleOpen}
              disabled={
                userLoading || !user || +user.balance < +item.products_amount
              }
              className="inline-flex items-center rounded-md bg-or px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-or-hover"
            >
              {t("Buy")}
            </button>
          </div>
        </div>
      </div>

      {/* <Modal
        className="modal-mui modal-email"
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <TextMobileStepper
            setEmail={setEmail}
            onConfirm={onConfirm}
            item={item}
            t={t}
          />
        </Box>
      </Modal> */}

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <TextMobileStepper
                setEmail={setEmail}
                onConfirm={onConfirm}
                item={item}
                t={t}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
