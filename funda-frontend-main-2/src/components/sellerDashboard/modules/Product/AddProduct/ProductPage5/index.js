import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Button } from "@mui/material";
import { setAlert } from "../../../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../../../redux/types";
import { useDispatch } from "react-redux";

const Product = ({ otherDetails, setOtherDetails }) => {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([
    {
      productKey: "",
      productValue: [],
    },
  ]);
  useEffect(() => {
    if (
      otherDetails.length &&
      otherDetails[0].productKey != "" &&
      otherDetails[0].productValue.length
    ) {
      setInputList(otherDetails);
    }
  }, [otherDetails.length]);
  let [pricetext, setpricetext] = useState(0);
  let [tagsAttrib, settagsAttrib] = useState("");

  function deleteTags(ele, index, tagindx) {
    let clone = inputList.slice(0);
    let cloneInput = inputList[index];
    cloneInput.productValue.splice(tagindx, 1);
    clone.splice(index, 1, cloneInput);
    setInputList(clone);
  }
  function deletePrice(inputlistIndex, priceInd, priceAtrib) {
    let clone = inputList.slice(0);
    clone[inputlistIndex].productValue[priceInd]["attributePrice"] = null;

    setInputList(clone);
  }
  function handleInputChangeValueTags(e, i) {
    if (e.target.value != "") {
      let clone = inputList.slice(0);
      let cloneInput = inputList[i];
      cloneInput.productValue.push({
        attributeName: e.target.value,
        attributePrice: null,
      });

      clone.splice(i, 1, cloneInput);

      setInputList(clone);
      setOtherDetails([...clone]);

      e.target.value = "";
      settagsAttrib("");
    }
  }

  function handleInputChangeValueTagsClick(i, val) {
    if (val != "") {
      let clone = inputList.slice(0);
      let cloneInput = inputList[i];
      cloneInput.productValue.push({
        attributeName: val,
        attributePrice: null,
      });

      clone.splice(i, 1, cloneInput);

      setInputList(clone);
      setOtherDetails([...clone]);
      val = "";
      settagsAttrib("");
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    inputList[index][name] = value;

    setOtherDetails([...inputList]);
  };

  const handleInputAdd = () => {
    if (
      inputList.every(
        (val) => val.productKey != "" && val.productValue.length > 0
      )
    ) {
      if (
        inputList[0]?.productKey != "" &&
        inputList[0]?.productValue?.every(
          (dt) => dt?.attributeName != "" && dt?.attributePrice != null
        )
      ) {
        setInputList([...inputList, { productKey: "", productValue: [] }]);
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Set Price for Added Variations",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "All fields are required",
          alertType: "danger",
        })
      );
    }
  };

  const handleRemoveInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);

    setInputList(list);
    setOtherDetails([...list]);
  };
  let [pricingAttrib, setpricingAttrib] = useState(null);

  const setprice = (atribObj, keyValInd, ele) => {
    if (pricingAttrib != null && ele?.key == "Enter") {
      let clone = inputList.slice(0);
      let cloneAttrib = atribObj;

      cloneAttrib.productValue[pricingAttrib]["attributePrice"] = Number(
        ele.target.value
      );
      clone.splice(keyValInd, 1, cloneAttrib);
      setInputList(clone);

      setpricetext("");
    }
  };
  const setpriceClick = (atribObj, keyValInd, ele) => {
    if (pricingAttrib != null) {
      let clone = inputList.slice(0);
      let cloneAttrib = atribObj;

      cloneAttrib.productValue[pricingAttrib]["attributePrice"] = Number(ele);
      clone.splice(keyValInd, 1, cloneAttrib);
      setInputList(clone);

      setpricetext("");
    }
  };
  const setpriceSelect = (ele) => {
    setpricingAttrib(ele.target.value);
  };

  return (
    <div>
      <Container maxWidth="md">
        <h1>Special Fields Added</h1>
        {inputList.map((instruction, i) => {
          return (
            <Grid container spacing={2} alignItems="center">
              <Grid item lg={11} md={11}>
                <Grid
                  container
                  spacing={2}
                  sx={{ borderTop: "1px solid #666666", marginTop: "20px" }}
                >
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <InputLabel
                      style={{ marginTop: "20px", marginBottom: "10px" }}
                    >
                      Attribute
                      {"      "}
                    </InputLabel>
                    <TextField
                      style={{ width: "100%" }}
                      name="productKey"
                      type="text"
                      value={instruction.productKey}
                      inputProps={{
                        maxLength: 40,
                      }}
                      onChange={(e) => handleInputChange(e, i)}
                      className="input-form"
                      id="standard-basic"
                      placeholder="e.g color,size"
                      label="e.g color,size"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={5}>
                    <Grid container justifyContent="left">
                      <Grid item lg={12} md={12} sm={12}>
                        <InputLabel
                          style={{ marginTop: "20px", marginBottom: "10px" }}
                        >
                          Variations
                        </InputLabel>
                        <TextField
                          sx={{ width: "100%" }}
                          name="productValue"
                          type="text"
                          value={tagsAttrib}
                          onChange={(e) => {
                            settagsAttrib(e.target.value.trim());
                            // let letterNumber = /^[a-zA-Z0-9]+$/;
                            // if (e.target.value.match(letterNumber)) {

                            //   e.target.value = "";
                            // } else {
                            //   settagsAttrib("");
                            //   dispatch(
                            //     setAlert(SET_ALERT, {
                            //       message: "Alphabets and Numbers only",
                            //       alertType: "danger",
                            //     })
                            //   );
                            // }
                          }}
                          InputProps={{
                            maxLength: 40,

                            endAdornment: (
                              <Button
                                sx={{
                                  fontSize: "12px",
                                  backgroundColor: "#D97C29",
                                  color: "white",
                                  border: "1px solid #D97C29",
                                  ":hover": {
                                    border: "1px solid #D97C29",
                                    backgroundColor: "white",
                                    color: "#D97C29",
                                  },
                                }}
                                onClick={(e) => {
                                  handleInputChangeValueTagsClick(
                                    i,
                                    tagsAttrib
                                  );
                                }}
                              >
                                Submit
                              </Button>
                            ),
                          }}
                          onKeyPress={(e) => {
                            if (e.key == "Enter") {
                              handleInputChangeValueTags(e, i);
                            }
                          }}
                          className="input-form"
                          id="standard-basic"
                          placeholder="e.g red,blue,white"
                          label="e.g red,blue,white"
                        />
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container>
                          {instruction.productValue.length > 0 &&
                            instruction.productValue.map(
                              (tagsValue, tagind) => (
                                <>
                                  <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={4}
                                    sx={{
                                      border: "1px solid black",
                                      borderRadius: "15px",
                                      padding: "2px",
                                      marginTop: "5px",
                                    }}
                                    textAlign="center"
                                  >
                                    <Grid container>
                                      <Grid item={9} alignSelf="flex-end">
                                        <Typography variant="body2">
                                          {tagsValue.attributeName}{" "}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid lg={1} alignSelf="flex-start">
                                    <IconButton
                                      sx={{
                                        p: 0,
                                        borderBottom: "none !important",
                                      }}
                                      onClick={(e) => {
                                        deleteTags(e, i, tagind);
                                      }}
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </Grid>
                                </>
                              )
                            )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {i <= 0 && instruction.productValue.length > 0 && (
                    <>
                      <Grid item xs={12} sm={12} md={5}>
                        <Typography
                          style={{ marginTop: "20px", marginBottom: "10px" }}
                        >
                          Select Variations
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Select Variations
                          </InputLabel>
                          <Select
                            sx={{ width: "100%", padding: "6px" }}
                            name="Select Variations"
                            label="Select Variations"
                            type="text"
                            fullWidth
                            onChange={(e) => {
                              setpriceSelect(e);
                            }}
                            className="input-form"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            {instruction.productValue.length > 0 &&
                              instruction.productValue.map(
                                (tagsValue, tagind) => (
                                  <MenuItem
                                    key={tagind}
                                    value={(tagsValue, tagind)}
                                  >
                                    {tagsValue.attributeName}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={5}>
                        <InputLabel
                          style={{ marginTop: "20px", marginBottom: "10px" }}
                        >
                          Set Price
                        </InputLabel>
                        <TextField
                          style={{ width: "100%" }}
                          name="productKey"
                          type="text"
                          label="SetPrice"
                          value={pricetext}
                          onChange={(e) => {
                            let letterNumber = /^[0-9]+$/;
                            if (e.target.value.match(letterNumber)) {
                              setpricetext(e.target.value);
                            } else {
                              setpricetext("");
                            }
                          }}
                          onKeyPress={(e) => {
                            if (e.key == "Enter") {
                              setprice(instruction, i, e);
                            }
                          }}
                          InputProps={{
                            maxLength: 40,
                            endAdornment: (
                              <IconButton
                                onClick={(e) => {
                                  setpriceClick(instruction, i, pricetext);
                                }}
                                sx={{ borderBottom: "none !important" }}
                              >
                                <CheckOutlinedIcon />
                              </IconButton>
                            ),
                          }}
                          className="input-form"
                          id="standard-basic"
                          labelId="demo-simple-select-label"
                        />
                      </Grid>
                      {instruction.productValue?.map(
                        (prodData, prodId) =>
                          prodData.attributePrice && (
                            <>
                              <Grid item lg={5} md={5} sm={5} textAlign="right">
                                <Grid container>
                                  <Grid item lg={12} md={12} textAlign="left">
                                    <Card sx={{ m: 1 }}>
                                      <CardContent sx={{ p: 2 }}>
                                        <Grid container alignItems="flex-start">
                                          <Grid item lg={10}>
                                            <Typography
                                              gutterBottom
                                              variant="body2"
                                            >
                                              Attribute Name:{" "}
                                              <span>
                                                {prodData.attributeName}
                                              </span>
                                            </Typography>

                                            {/* </div> */}
                                          </Grid>
                                          <Grid item lg={2}>
                                            <IconButton
                                              sx={{
                                                borderBottom: "none !important",
                                              }}
                                              onClick={(e) => {
                                                deletePrice(
                                                  i,
                                                  prodId,
                                                  prodData
                                                );
                                              }}
                                            >
                                              <CloseIcon fontSize="small" />
                                            </IconButton>
                                          </Grid>
                                          <Grid item lg={12}>
                                            <Typography
                                              gutterBottom
                                              variant="body2"
                                            >
                                              Attribute Price:{" "}
                                              <span>
                                                Rs. {prodData?.attributePrice}
                                              </span>
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          )
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

              {inputList.length !== 1 && (
                <Grid
                  style={{ marginTop: "50px" }}
                  item
                  xs={12}
                  sm={12}
                  md={1}
                  lg={1}
                >
                  <span
                    onClick={() => handleRemoveInput(i)}
                    className="delete-action"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </Grid>
              )}

              {inputList.length - 1 === i && (
                <Grid item xs={12} sm={12}>
                  <button
                    className="add-specialfields"
                    onClick={handleInputAdd}
                  >
                    Add Another Attribute
                  </button>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Container>
    </div>
  );
};

export default Product;
