import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        //
    },
    container: {
        boxSizing: 'border-box'
    },
    typography: {
        fontSize: 13
    },
    cell: {
        //maxWidth: '120px',
        overflowX: 'hidden'
    },
    textfield: {
        width: '150px'
    },
    button: {
        width: '100px'
    }
}));

export { useStyles }
