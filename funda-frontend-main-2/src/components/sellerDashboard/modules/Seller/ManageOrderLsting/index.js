import React from "react";
import { lighten } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Colddrink from "../../../../../assets/Colddrink.png";
import moment from "moment";
import "./index.css";

function createData(name, calories, fat, carbs, protein, action, img3) {
  return { name, calories, fat, carbs, protein, action, img3 };
}

const rows = [
  createData(
    ["2 hour ago", <br />, "13 / 8 / 2021", <br />, "1:20 pm IST"],
    [
      "408-0881495-9239544",
      <br />,
      "Buyer name:",
      <br />,
      "smriti",
      <br />,
      "Fulfilment method: seller sales channel: Amazon.in",
      <br />,
      "prime",
    ],
    <img src={Colddrink} width={100} />,
    [
      "Khadi Natural Herbal Aloevera Cnditioner For Hair Growth | Suitable For Curly, Dry And Frizzy Hair - Controls Hair Fall | Parben And SLS Free Conditioner For Men Women 200ml",
      <br />,
      "ASIN: B09BM75KWN",
      <br />,
      "SKU: KNHAC-MFN",
      <br />,
      "Quantity: 1",
      <br />,
      "Item subtotal: ₹280.00",
    ],
    [
      "Standard",
      <br />,
      "Ship by date: 14 Aug 2021",
      <br />,
      "Deliver by date: 18 Aug 2021 ",
    ],
    <button className="unshipped_button">Unshipped(1)</button>,
    [
      <button className="action_button">Schedule pickup</button>,
      <br />,
      <button className="print_button">Print packing slip</button>,
      <br />,
      <button className="print_button">Print tax invoice </button>,
      <br />,
      <button className="print_button">Cancel order</button>,
    ]
  ),
  createData(
    ["2 hour ago", <br />, "13 / 8 / 2021", <br />, "1:20 pm IST"],
    [
      "408-0881495-9239544",
      <br />,
      "Buyer name:",
      <br />,
      "smriti",
      <br />,
      "Fulfilment method: seller sales channel: Amazon.in",
      <br />,
      "prime",
    ],
    <img src={Colddrink} width={100} />,
    [
      "Khadi Natural Herbal Aloevera Cnditioner For Hair Growth | Suitable For Curly, Dry And Frizzy Hair - Controls Hair Fall | Parben And SLS Free Conditioner For Men Women 200ml",
      <br />,
      "ASIN: B09BM75KWN",
      <br />,
      "SKU: KNHAC-MFN",
      <br />,
      "Quantity: 1",
      <br />,
      "Item subtotal: ₹280.00",
    ],
    [
      "Standard",
      <br />,
      "Ship by date: 14 Aug 2021",
      <br />,
      "Deliver by date: 18 Aug 2021 ",
    ],
    <button className="unshipped_button">Unshipped(1)</button>,
    [
      <button className="action_button">Schedule pickup</button>,
      <br />,
      <button className="print_button">Print packing slip</button>,
      <br />,
      <button className="print_button">Print tax invoice </button>,
      <br />,
      <button className="print_button">Cancel order</button>,
    ]
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Order date",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Order details",
  },
  { id: "img3", numeric: true, disablePadding: false, label: "Image" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Product name" },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Customer option",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Order Status",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return <div></div>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ sellerItems, orders, product }) {
  const classes = useStyles();
 
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const userId = JSON.parse(localStorage.getItem("user")).user?.id;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const renderProductDetails = () => {
    const product = orders.filter(({ sellerId }) =>
      sellerId.find((id) => id === userId)
    );
 
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  renderProductDetails();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(orders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                
                  const filteredRow = row?.items?.filter(
                    ({ sellerId }) => userId === sellerId
                  );
              
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {moment(row?.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {filteredRow?.map((item) => (
                          <div>{item.productDescription}</div>
                        ))}
                      </TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">
                        {filteredRow?.map((item) => (
                          <div>{item.productName}</div>
                        ))}
                      </TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.img3}</TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
