import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getCategory } from "../../../../redux/_actions/categoryAction";
import moment from "moment";
const DataTable = (props) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const columns = props.column;
  const rows = props.data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(props.rows));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return <>
    <TableContainer style={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    if (column.id === "expire_date") {
                      value = moment(value).format("MM/DD/YYYY");
                    }

                  

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.dbId === "category"
                          ? category.categories.data.find(
                              (x) => x._id === value
                            )?.categoryName
                          : column.format
                          ? column.format(value, row)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[2, 10, 25, 100]}
      component="div"
      className="table-footer"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </>;
};

export default DataTable;
