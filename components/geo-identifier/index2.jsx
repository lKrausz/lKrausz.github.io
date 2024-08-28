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
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    console.log(value); // Обработка выбранного значения
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  console.log("USER", userData);
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    setLoading(true);
    if (userData.geo_approve === null || userData.geo_approve === "") {
      updateGeo(
        localStorage.getItem("user_id"),
        localStorage.getItem("country_data")
      );
    }
    setLoading(false)
  };



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
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>{`Are you from ${localStorage.getItem(
            "country_name"
          )}?`}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Not right? Pick your actual country of residence from the list below
            to see the relevant offers!
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleNo}>
            Choose my Country
          </Button>

          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
        <Select
          className="RRR"
          options={options}
          value={value}
          onChange={changeHandler}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
        />
      </Dialog>
    </React.Fragment>
  );
}
