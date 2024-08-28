"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { updateGeo } from "@/components/getUser/updateGeo";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";

function getCountryOptions() {
  return countryList()
    .getData()
    .map((option) => ({
      ...option,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ReactCountryFlag
            countryCode={option.value}
            svg
            style={{ marginRight: 8, width: "2em", height: "1em" }}
          />
          {option.label} ({option.value})
        </div>
      ),
    }));
}

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { t } = useTranslation();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const [userData, setUserData] = React.useState(null);

  const initialCountryCode = localStorage.getItem("country_data");
  const options = React.useMemo(() => getCountryOptions(), []);
  const initialValue = options.find(
    (option) => option.value === initialCountryCode
  );

  const [value, setValue] = React.useState(initialValue);

  const changeHandler = (value) => {
    setValue(value);
    console.log(value); 
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    const an = (value && value !== "N/A" && value !== "") ? value : localStorage.getItem("country_data");
    setOpen(false);
    setLoading(true);
    if (userData.geo_approve === null || userData.geo_approve === "") {
      try {
        await updateGeo(localStorage.getItem("user_id"), an.value);
        localStorage.setItem("country_brands", an.value);
        console.log("====", an);
        window.location.reload(); 
      } catch (error) {
        console.error("Failed to update geo:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  const [show, setShow] = React.useState(true);
  const handleNo = () => {
    setShow(!show);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="modal-country"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong className="title-brands">{`${t("Are you from")} ${localStorage.getItem(
            "country_name"
          )}?`}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Not right? Pick your actual country of residence from the list below to see the relevant offers!")}
          </DialogContentText>
        </DialogContent>
        {show && (
          <DialogActions>
            <Button className="btn btn-secondary" onClick={handleNo}>{t("Choose my Country")}</Button>

            <Button className="btn btn-primary" onClick={handleYes} autoFocus>
              {t("Yes")}
            </Button>
          </DialogActions>
        )}
        {!show && (
          <DialogActions className="flex items-center">
            <Select
              className="RRR"
              options={options}
              value={value}
              onChange={changeHandler}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
            />
            <Button className="btn btn-primary" onClick={handleYes} autoFocus>
              {t("Confirm")}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
