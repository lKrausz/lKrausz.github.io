"use client";
import {
  Box,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Typography,
} from "@mui/material";
import {
  Bank,
  ClockCounterClockwise,
  ShoppingCart,
  Spade,
} from "phosphor-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Tabs = {
  labels: string[];
  content: JSX.Element[];
};

type TabsProps = {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: Tabs;
};

const iconMap: Record<
  string,
  ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>
> = {
  "Withdrawal Request": Bank,
  "Withdrawal History": ClockCounterClockwise,
  "Cards Shop": ShoppingCart,
  "Get $20": Spade
};

const getLabel = (label: string) => {
  // const Icon = iconMap[label];
  // if (!Icon) {
  //   console.error("No icon found for label:", label);
  //   return (
  //     <Box key={label} component="span" display="flex" alignItems="center">
  //       <Typography component="span" marginLeft={1}>
  //         {label}
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box key={label} component="span" display="flex" alignItems="center">
      {/* <Icon size={20} /> */}
      <Typography component="span" marginLeft={1}>
        {label}
      </Typography>
    </Box>
  );
};

export const Tabs = ({ value, onChange, tabs }: TabsProps) => {
  return (
    <>
      <MuiTabs
        className="tabs_pagination"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={onChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {tabs.labels.map((label) => (
          <MuiTab className="tab-label" key={label} label={getLabel(label)} />
        ))}
      </MuiTabs>
      {tabs.content.map((content, idx) => (
        <TabPanel key={idx} index={idx} value={value} className="tab_panel">
          {content}
        </TabPanel>
      ))}
    </>
  );
};

type TabPanelProps = {
  index: number;
  value: number;
  children: React.ReactNode;
  className?: string;
};

const TabPanel = ({ children, value, index, className }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      className={className}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
