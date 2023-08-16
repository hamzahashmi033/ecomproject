import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./webandsocial.css"
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { useDispatch } from "react-redux";
const Webandsocial = ({
  sellerSignUp,
  setsellerSignUp,
  counter,
  setcounter,
}) => {
  const dispatch = useDispatch();
  function submitSocialUrls() {
    if (
      sellerSignUp.social_account.length > 0 &&
      !sellerSignUp.social_account?.every((dt) => dt == "")
    ) {
     
      setcounter(counter + 1);
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Empty Fields",
          alertType: "danger",
        })
      );
    }
  }
  return (
    <div className="webandsocial">
   
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <div className="icons">
            <FacebookIcon />{" "}
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ lineHeight: "1.3", paddingLeft: "4px" }}
            >
              Facebook
            </Typography>
          </div>
          <input
            type="url"
            name="facebook"
            value={sellerSignUp?.social_account[0]}
            className="fb-input"
            pattern="https://.*"
            onChange={(e) => {
             
              let clone = sellerSignUp?.social_account?.slice(0);
              clone.splice(0, 1, e.target.value);

              setsellerSignUp({ ...sellerSignUp, social_account: clone });
            }}
            placeholder="Paste url here"
          />
        </Grid>
        <Grid item xs={12}>
          <div className="icons">
            <PinterestIcon />{" "}
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ lineHeight: "1.3", paddingLeft: "4px" }}
            >
              Pinterest
            </Typography>
          </div>

          <input
            name="Pinterest"
            type="url"
            className="fb-input"
            value={sellerSignUp?.social_account[1]}
            pattern="https://.*"
            onChange={(e) => {
              let clone = sellerSignUp?.social_account?.slice(0);
              clone.splice(1, 1, e.target.value);
              setsellerSignUp({ ...sellerSignUp, social_account: clone });
            }}
            placeholder="Paste url here"
          />
        </Grid>
        <Grid item xs={12}>
          <div className="icons">
            <TwitterIcon />{" "}
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ lineHeight: "1.3", paddingLeft: "4px" }}
            >
              Twitter
            </Typography>
          </div>

          <input
            name="twitter"
            type="url"
            value={sellerSignUp?.social_account[2]}
            onChange={(e) => {
              let clone = sellerSignUp?.social_account?.slice(0);
              clone.splice(2, 1, e.target.value);
              setsellerSignUp({ ...sellerSignUp, social_account: clone });
            }}
            className="fb-input"
            pattern="https://.*"
            placeholder="Paste url here"
          />
        </Grid>
        <Grid item xs={12}>
          <div className="icons">
            <InstagramIcon />{" "}
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ lineHeight: "1.3", paddingLeft: "4px" }}
            >
              Instagram
            </Typography>
          </div>

          <input
            name="instagram"
            value={sellerSignUp?.social_account[3]}
            onChange={(e) => {
              let clone = sellerSignUp?.social_account?.slice(0);
              clone.splice(3, 1, e.target.value);
              setsellerSignUp({ ...sellerSignUp, social_account: clone });
            }}
            type="url"
            className="fb-input"
            pattern="https://.*"
            placeholder="Paste url here"
          />
        </Grid>
        <Grid item xs={12}>
          {sellerSignUp.social_account.length < 1 && (
            <Typography variant="h6" gutterBottom component="div">
              Note: Provide at least one social account
            </Typography>
          )}
        </Grid>
        
        {/* </form> */}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
         <Button
                variant="outlined"
                onClick={() => setcounter(counter - 1)}
              >
                Go Back
          </Button>

          <Button onClick={submitSocialUrls} variant="contained">
                Next
          </Button>{" "}
      </div>
    </div>
  );
};

export default Webandsocial;
