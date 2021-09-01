// import theme from 'styles/theme';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 0',
    },
    card: {
      padding: '30px 40px',
      minWidth: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }),
);

export default useStyles;
