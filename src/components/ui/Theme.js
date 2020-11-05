import { createMuiTheme } from '@material-ui/core/styles';

const appleBlue = '#0B72B9'
const appleOrange = '#FFBA60'
const appleGrey = '#868686'

export default createMuiTheme({
    palette: {
        common: {
            appleBlue: `${appleBlue}`,
            appleOrange: `${appleOrange}`
        },
        primary: {
            main: `${appleBlue}`
        },
        secondary: {
            main: appleOrange
        }
    },
        typography: {
            tab: {
                fontFamily: 'Orpheus-Pro',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
        },
        estimate: {
            fontSize: '1rem',
            textTransform: 'none',
            fontFamily: 'Orpheus-Pro',
            color: 'white'
        },
        h2: {
            fontFamily: "Orpheus-Pro",
            fontSize: "2.5rem",
            color: `${appleBlue}`,
            lineHeight: 1.5
        },
        h3: {
            fontFamily: "Orpheus-Pro",
            fontSize: "2.5rem",
            color: appleBlue
        },
        h4: {
            fontFamily: "Orpheus-Pro",
            fontSize: "1.75rem",
            color: `${appleBlue}`,
            fontWeight: 700
        }, 
        subtitle1: {
            fontFamily: "Orpheus-Pro",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: `${appleGrey}`
        },
        subtitle2: {
            fontFamily: "Orpheus-Pro",
            fontSize: "1.25rem",
            color: 'white',
            fontWeight: 300
        },
        learnButton: {
            borderColor: `${appleBlue}`,
            color: `${appleBlue}`,
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Orpheus-Pro",
            fontWeight: "bold",
        }
    }
});