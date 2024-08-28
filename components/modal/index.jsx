import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import wheel from "@/public/whl2.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { XSquare } from "phosphor-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-0 modal-brands"
      >
        <Box sx={style}>
        <XSquare className="ml-auto mr-1 mt-1 cursor-pointer" onClick={handleClose} size={32} /> 
          <div className="p-3 pb-10 relative">
            <Typography
              className="title-brands"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {t("Unlock Up To $20: Deposit Now With Your Registered Brands")}
            </Typography>
            <Typography
              id="modal-modal-description"
              className="mb-3"
              sx={{ mt: 2 }}
            >
              {t(
                "Select from the list of registered brands to complete your first deposit and receive up to $20 in rewards. Take advantage of this special offer now!"
              )}
            </Typography>
            <Link
              onClick={handleClose}
              className="btn btn-primary mt-3"
              href={`/brands`}
            >
              {t("Show Brands")}
            </Link>
          </div>
          <Image src={wheel} width={384} height={203} alt="wheel" />
        </Box>
      </Modal>
    </div>
  );
}
