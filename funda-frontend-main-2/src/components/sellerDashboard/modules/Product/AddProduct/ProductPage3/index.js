import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { getTag } from "../../../../../../redux/_actions/tagAction";
import InputLabel from "@mui/material/InputLabel";
import makeStyles from "@mui/styles/makeStyles";

const Productdetails = (props) => {
  const dispatch = useDispatch();
  const [tagValue, setTagValue] = useState([]);
  const tag = useSelector((state) => state.tag);
  useEffect(() => {
    dispatch(getTag());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      "& .MuiTextField-root": {
        width: "300px",
      },
      "& .MuiButtonBase-root": {},
    },
  }));

  const classes = useStyles();
  const handleChange = (event) => {
    const value = event.target.value;
    props.setSelectedTags(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    props.setWarranty((prev) => ({ ...prev, description: value }));
  };

  return (
    <div>
      <Container maxWidth="md">
        <h1>Product Details</h1>
        <p>
          Choosing the best product type that you see the most appropriate data
          fields for your product. Browser the product types or juse search.
          <span>See if your product already exists on Cleverteq.</span>
        </p>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div style={{ marginTop: "30px" }} className="product_heading">
              <p className="browser">Browser</p>
              <p className="product"> Product Details</p>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: "20px", marginBottom: "10px" }}>
              Product Name
            </InputLabel>
            <TextField
              style={{ width: "100%" }}
              name="product-name"
              type="text"
              value={props.productName}
              inputProps={{
                maxLength: 40,
              }}
              onChange={(e) => props.setProductName(e.target.value)}
              className="input-form"
              id="standard-basic"
              label="e.g clothes"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: "20px", marginBottom: "10px" }}>
              Product Price
            </InputLabel>
            <TextField
              style={{ width: "100%" }}
              name="product-price"
              type="text"
              value={props.productPrice}
              inputProps={{
                maxLength: 40,
              }}
              onChange={(e) => {
                let priceVal = +e.target.value;
                if (!isNaN(priceVal)) {
                  props.setProductPrice(e.target.value);
                }
              }}
              className="input-form"
              id="standard-basic"
              label="e.g 300"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: "20px", marginBottom: "10px" }}>
              Product Quantity
            </InputLabel>
            <TextField
              style={{ width: "100%" }}
              name="product-quantity"
              type="text"
              inputProps={{
                maxLength: 40,
              }}
              onChange={(e) => {
                let quanVal = +e.target.value;
                if (!isNaN(quanVal)) {
                  props.setProductQuantity(e.target.value);
                }
              }}
              className="input-form"
              id="standard-basic"
              label="e.g 30"
              value={props.productQuantity}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel
              style={{ marginTop: "20px", marginBottom: "10px" }}
              id="mutiple-select-label"
            >
              Product Tags
            </InputLabel>
            <Select
              style={{ width: "100%", marginTop: "10px" }}
              labelId="mutiple-select-label"
              label=""
              multiple
              value={props.selectedTags}
              placeholder="e.g test"
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {tag.tags?.data
                ? tag.tags?.data.map((option) => (
                    <MenuItem key={option._id} value={option.tagName}>
                      <ListItemIcon>
                        <Checkbox
                          checked={
                            props.selectedTags.indexOf(option.tagName) > -1
                          }
                        />
                      </ListItemIcon>
                      <ListItemText primary={option.tagName} />
                    </MenuItem>
                  ))
                : []}
            </Select>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12} xs={12}>
            <InputLabel
              style={{ marginTop: "20px", marginBottom: "10px" }}
              id="mutiple-select-label"
            >
              Warranty
            </InputLabel>
            <Grid container>
              <Grid item md={6} sm={12}>
                <TextField
                  style={{ width: "95%" }}
                  fullWidth
                  name="warranty_number"
                  type="text"
                  inputProps={{
                    maxLength: 40,
                  }}
                  onChange={(e) => {
                    let quanVal = +e.target.value;
                    if (!isNaN(quanVal)) {
                      props.setWarranty((prev) => ({
                        ...prev,
                        number: quanVal,
                      }));
                    }
                  }}
                  className="input-form"
                  id="standard-basic"
                  label=""
                  value={props.warranty.number}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Select
                  style={{ width: "100%" }}
                  labelId="mutiple-select-label"
                  label=""
                  // multiple
                  value={props.warranty.description}
                  // placeholder="e.g test"
                  onChange={handleDescriptionChange}
                  // renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="Year(s)">
                    <ListItemText primary="Year(s)" />
                  </MenuItem>
                  <MenuItem value="Month(s)">
                    <ListItemText primary="Month(s)" />
                  </MenuItem>
                  <MenuItem value="Week(s)">
                    <ListItemText primary="Week(s)" />
                  </MenuItem>
                  <MenuItem value="Day(s)">
                    <ListItemText primary="Day(s)" />
                  </MenuItem>
                  {/* {tag.tags?.data
                    ? tag.tags?.data.map((option) => (
                        <MenuItem key={option._id} value={option.tagName}>
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                props.selectedTags.indexOf(option.tagName) > -1
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={option.tagName} />
                        </MenuItem>
                      ))
                    : []} */}
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: "20px", marginBottom: "10px" }}>
              Product Description
            </InputLabel>
            <TextField
              style={{ width: "100%" }}
              multiline
              rows={5}
              name="product-description"
              type="text"
              value={props.productDescription}
              onChange={(e) => props.setProductDescription(e.target.value)}
              className="input-form"
              id="standard-basic"
              label="e.g Product was good"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ marginTop: "20px", marginBottom: "10px" }}>
              Product Specification
            </InputLabel>
            <TextField
              style={{ width: "100%" }}
              multiline
              rows={5}
              name="product-specification"
              type="text"
              value={props.productspecification}
              onChange={(e) => props.setProductspecification(e.target.value)}
              className="input-form"
              id="standard-basic"
              label="e.g Product was good"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Productdetails;
