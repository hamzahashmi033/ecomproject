import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./conformAccount.css";
const ConformAccount = () => {
  const InputBox = {
    width: "94%",
    padding: "10px",
    border: "1px solid rgb(214 214 214)",
  };
  const ConfirmAccount = {
    width: "50%",
    margin: "auto",
    textAlign: "center",
  };
  const confirm = {
    display: "flex",
  };
  const buttonbg = {};
  return (
    <div style={ConfirmAccount}>
      <Typography variant="body1" gutterBottom component="div">
        Enter Confirmation code send to your mobile phone
      </Typography>
      <div style={confirm}>
        <input type="text" style={InputBox} placeholder="Select Country" />
        <Button variant="contained">Confirm</Button>
      </div>
      <Typography variant="body1" gutterBottom component="div" marginTop={10}>
        Dont’s have code?
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        Generate new code, Enter your Mobile Number
      </Typography>
      <input type="text" style={InputBox} placeholder="Select Country" />
      <Button variant="contained">Regenerate Code</Button>
      <Typography variant="body1" gutterBottom component="div" marginTop={5}>
        Thank you for submitting Seller Application. Your application is being
        reviewed, withing 48 hours. You will receive and email about the status
        of your application.
      </Typography>
      <Button variant="contained">LET’S GO FOR SHOPPING</Button>
    </div>
  );
};

export default ConformAccount;
