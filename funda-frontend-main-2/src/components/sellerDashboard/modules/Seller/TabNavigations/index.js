import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChevronRight } from "@mui/icons-material";
import "./index.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="tab_navigation">
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="0 Pending" {...a11yProps(0)} />
          <Tab label="2 Unshipped" {...a11yProps(1)} />
          <Tab label="Cancelled" {...a11yProps(2)} />
          <Tab label="Sent" {...a11yProps(3)} />
          <Tab className="tab_4" label="View FBA orders" {...a11yProps(4)} />
          <ChevronRight />
        </Tabs>
      </div>
    </section>
  );
}
