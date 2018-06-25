import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loader from 'react-loader-spinner';
import { withStyles } from '@material-ui/core/styles';

class LoadingScreen extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <p className={classes.text}>Searching for jobs near by...</p>
          <Loader
            type="Rings"
            color="black"
            height="70"
            width="70"
          />
        </Paper>
      </div>
    );
  }
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    width: '90%',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.7em',
    fontWeight: '300',
  }
};
export default withStyles(styles)(LoadingScreen);
