import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { getUserData } from "@/components/getUser/getUser";
import { styled } from "@mui/material/styles";

export default function AccountMenu({ userId, t }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [d, setD] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const data = await getUserData(userId); 
        setUserData(data); 
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };
    fetchData();
    if (d && typeof d === 'string' && d.includes("Json")) {
   
      fetchData();
    }
  }, [userId, d]);




  useEffect(() => {
    const handleMessage = (event) => {

      if (event.origin !== "https://topbon.us") {
        // console.error("Received message from an unauthorized origin:", event.origin);
        return;
      }
      // console.log("Raw data from iframe:", event.data);
      const jsonData = event.data;
      setD(typeof jsonData === 'string' ? jsonData : "");
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  
  return userData ? (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <CustomBadge badgeContent={userData.tickets} color="secondary">
          <Tooltip title={t("Account menu")}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <CustomAvatar sx={{ width: 32, height: 32 }}>
                {userData.login.charAt(0).toUpperCase()}
              </CustomAvatar>
            </IconButton>
          </Tooltip>
        </CustomBadge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          className="w-full flex items-center user__balance"
          onClick={handleClose}
        >
          {t("Your balance:")}{" "}
          <span className="p-2 ml-2">{userData.balance}$</span>
        </div>
        <MenuItem onClick={handleClose}>
          <Badge badgeContent={userData.tickets} color="primary">
            <Link className="flex items-center w-full" href={`/fortune`}>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon
                  sx={{ width: 20, height: 20 }}
                  className="mr-1"
                />
              </ListItemIcon>
              {t("Fortune wheel")}
            </Link>
          </Badge>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            className="flex items-center w-full"
            href={`/personal`}
          >
            <ListItemIcon>
              <AccountBalanceWalletOutlinedIcon
                sx={{ width: 20, height: 20 }}
                className="mr-1"
              />
            </ListItemIcon>
            {t("My wallet")}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            className="flex items-center w-full"
            href={`/shop`}
          >
            <ListItemIcon>
              <ShoppingBagOutlinedIcon
                sx={{ width: 20, height: 20 }}
                className="mr-1"
              />
            </ListItemIcon>
            {t("Cards Shop")}
          </Link>
        </MenuItem>
        <Divider />
      </Menu>
    </React.Fragment>
  ) : (
    <div></div>
  );
}
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  background: "#DCEBFC",
  width: "44px !important",
  height: "44px !important",
  color: "#1B5DB2",
  fontWeight: "700",
  fontSize: "21px",
}));

const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    top: "15px",
    right: "5px",
    background: "#fa932c",
    fontWeight: "700",
    fontSize: "11px",
  },
}));
