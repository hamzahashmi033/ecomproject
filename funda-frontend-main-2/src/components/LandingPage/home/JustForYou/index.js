import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardOne from "./Cardone";
import { Button } from "@mui/material";
import { counter } from "@fortawesome/fontawesome-svg-core";
const Index = ({ products }) => {
  const [justforU, setjustforU] = useState([]);
  let [counter, setcounter] = useState(3);

  useEffect(() => {
    let clone = [];
    for (let i = 0; i < products?.length; i += 5) {
      const chunk = products.slice(i, i + 5);
      clone.push(chunk);
    }

    setjustforU(clone);
  }, [products, counter]);
  return (
    <>
      <Typography
        variant="h5"
        display="block"
        gutterBottom
        sx={{ mt: 2, fontWeight: "bold", color: "#4D4D4D" }}
        pt={{ xs: 1, sm: 7, md: 7 }}
        pb={{ xs: 1, sm: 3, md: 3 }}
      >
        Just for You
      </Typography>
      <Grid container spacing={2}>
        {justforU?.map((dt, dtindx) =>
          dtindx <= counter ? (
            <Grid item xs={12} md={6} lg={6}>
              <Grid container spacing={2}>
                {dtindx % 2 === 0
                  ? dt?.map((dtdata, dtDataIndx) =>
                      dtDataIndx === 0 ? (
                        <Grid
                          item
                          xs={0}
                          sm={0}
                          md={12}
                          sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                          }}
                        >
                          <Card dtslice={dtdata} />
                        </Grid>
                      ) : (
                        <Grid item xs={6} md={6} lg={6}>
                          <CardOne dtslice={dtdata} />
                        </Grid>
                      )
                    )
                  : dtindx % 2 === 1 &&
                    dt?.map((dtdata, dtDataIndx) =>
                      dtDataIndx === dt?.length - 1 ? (
                        <Grid
                          item
                          xs={0}
                          sm={0}
                          lg={12}
                          sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                          }}
                        >
                          <Card dtslice={dtdata} />
                        </Grid>
                      ) : (
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <CardOne dtslice={dtdata} />
                        </Grid>
                      )
                    )}
              </Grid>
            </Grid>
          ) : null
        )}
        <Grid item lg={12} style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          <Grid container>
            <Grid item>
              <Button
                sx={
                  justforU.length > 0
                    ? counter + 2 < justforU.length - 1
                      ? {
                          backgroundColor: "#D97C29",
                          color: "white",
                          border: "1px solid transparent",
                          padding: "10px 20px",
                          margin: "40px 0px 12px",
                          ":hover": {
                            backgroundColor: "white",
                            border: "1px solid #D97C29",
                            color: "#583adb",
                          },
                        }
                      : { display: "none" }
                    : { display: "none" }
                }
                onClick={() => {
                  if (justforU.length > 0) {
                    if (counter == justforU.length - 1) {
                      setcounter(justforU.length - 1);
                    } else if (
                      counter + 2 == justforU.length - 1 &&
                      justforU[justforU.length - 1].length == 5
                    ) {
                      setcounter(justforU.length - 1);
                    } else if (
                      counter < justforU.length &&
                      counter + 2 < justforU.length - 1
                    ) {
                      setcounter(counter + 2);
                    }
                  } else {
                    setcounter(0);
                  }
                }}
                // sx={{
                //   backgroundColor: "#D97C29",
                //   color: "white",
                //   border: "1px solid transparent",
                //   padding: "10px 20px",
                //   margin: "20px 0px 12px",
                //   ":hover": {
                //     backgroundColor: "white",
                //     border: "1px solid #D97C29",
                //     color: "#583adb",
                //   },
                // }}
              >
                Load More
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
