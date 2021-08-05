import React from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
const styles = (theme) => ({
  userSection: {},
  quoteSection: {
    padding: "20px",
  },
  alluserSection: {
    padding: "20px 10px 10px 10px",
    height: "102%",
  },
  userProfilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "12px",
    border: "0.7px solid white",
  },
  userintialSection: {
    padding: "10px 0 0 0",
  },
  userName: {
    marginLeft: "15px",
  },
  menuDiv: {
    padding: "20px",
    width: "100%",
  },
  Icons: {
    position: "relative",
    top: "5px",
    marginRight: "5px",
  },
  userDetailDiv: {
    // background:'#c1ddf6',
    background: "#0070ff",
    width: "100%",
    padding: "10px 12px",
    color: "white",
  },
  links: {
    textDecoration: "none",
    color: "black",
    marginBottom: "10px",
  },
  linksH6: {
    marginBottom: "13px",
    marginLeft: "9px",
  },
});
function ProfDash({ classes, ...props }) {      
  return (      
    <>
      <Grid item xs={12} lg={2} sm={3} md={3} className={classes.userSection}>
        <Grid container>
          <Grid item lg={12} className={classes.userDetailDiv}>
            <div className={classes.userintialSection}>
              <img
                src={props.setuser.image}
                alt="User Pic"
                className={classes.userProfilePic}
              ></img>
            </div>
            <Typography variant="h6" className={classes.userName}>
              {props.setuser.full_name}              
            </Typography>
            <Typography variant="body2" className={classes.userName}>
              {props.setuser.email}
            </Typography>
          </Grid>
          <Grid item lg={12} className={classes.menuDiv}>
            <Link to="/add" className={classes.links}>
              <Typography variant="h6" className={classes.linksH6}>
                <QueueRoundedIcon className={classes.Icons} />
                Add Quotes
              </Typography>
            </Link>
            <Link to="/view" className={classes.links}>
              <Typography variant="h6" className={classes.linksH6}>
                <CollectionsBookmarkIcon className={classes.Icons} />
                Quotes
              </Typography>
            </Link>
            <Link to="/profile" className={classes.links}>
              <Typography variant="h6" className={classes.linksH6}>
                <AccountCircleRoundedIcon className={classes.Icons} />
                Profile
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default (withStyles(styles)(ProfDash));
