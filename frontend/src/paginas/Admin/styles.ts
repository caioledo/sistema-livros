import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formTitle: {
      fontFamily: 'Roboto',
      fontSize: 24,
      lineHeight: 1.5,
      letterSpacing: 0.32,
      fontWeight: 500,
    },
    header: {
      //width: '100%',
      height: '62px',
      //justifyContent: 'center',
      //alignItems: 'center',
      //marginTop: '0',
      backgroundColor: '#fff',
      paddingBottom: '45px',
      //marginBottom: '30px'
    },
    paper: {
      height: '62px',
      //justifyContent: 'center',
      marginTop: '0',
      backgroundColor: '#fff'
    },
    textfield: {
      marginRight: '40px'
    },
    tablebox: {
      height: '350px',
      maxWidth: '1320px',
      overflowY: 'scroll',
      backgroundColor: '#fff',
      overflowX: 'visible'
    },
    button: {
      marginRight: '10px'
    },
  }),
);

export { useStyles }
