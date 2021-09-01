import { Card, Container, CssBaseline, Grid, ListItemText, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { handleGetCountryData, handleGetRegions } from './utils/api';
import {Button} from '@material-ui/core';
import { Menu } from './components/Menu';
import dataRange from 'date-range-array';
import { getXdaysfromToday } from './utils/toIsoString';
import useStyles from './styles/home';
import CountUp from 'react-countup';

// icons
// import CloseIcon from '@material-ui/icons/Close';
// import ListIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Typography } from '@material-ui/core';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Skeleton } from '@material-ui/lab';

// import { ThemeProvider } from '@material-ui/core/styles';
interface Region {
    iso: string;
    name: string;
}
interface CountryData {
  date: string;
  newCases: number; // confirmed_diff
  newDeaths: number; // deaths_diff
}

const App = () => {
  const classes = useStyles();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [ isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [ isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [countryData, setCountryData] = useState<CountryData>({
    date: "",
    newCases: 0,// confirmed_diff
    newDeaths: 0,
  })

  const [ countryData90Days, setCountryData90Days] = useState<CountryData[]>([]);

  const handleSetRegions = async () => {
    const response = await handleGetRegions();
    const data = response.data;
    setRegions(data);
  }
  const handleCountryData = async (iso: string) => {
    const date = getXdaysfromToday(1);
    const response = await handleGetCountryData(iso, date);
    setCountryData(response);
  }
  const handleCountryData90days = async (iso: string) => {
    let ref = []
    for (let i = 1; i <= 90; i++){
      setIsDataLoading(true)
      const date = getXdaysfromToday(i);
      const response = await handleGetCountryData(iso, date);
      ref.push(response)
    }
    setIsDataLoading(false)
    const data: CountryData[] = ref;
    setCountryData90Days(data);
    console.log(countryData90Days)
  }

 

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelectCountry = (event: React.MouseEvent<HTMLElement>, region: Region) => {
    setSelectedCountry(region.name);
    setIsInitialLoading(false);
    handleCountryData(region.iso);
    handleCountryData90days(region.iso);
    setAnchorEl(null);
  };

  useEffect(()=> {
    handleSetRegions();
  },[])

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <ThemeProvider theme={Theme}>
    <Container>
      
      <CssBaseline />
      {/* {regions.map(region=> {
        return (
          <div key={region.name}>{region.name}</div>
        )
      })} */}
      <header className={classes.header}>
        <span style={{maxWidth: '70vw'}}>
        <Typography variant="h3" component="h1">
          Covid19 Tracker
        </Typography>
        </span>
        <Button
          endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
          onClick={handleOpenMenu}
        >
          {selectedCountry || 'Select country'}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        > 

          {regions.map((region)=> {
            return (
              <MenuItem 
                key={region.name} 
                onClick={ (event) => handleSelectCountry(event, region)}
              >
                <ListItemText primary={`${region.name}`} /> 
              </MenuItem>
            )
          })} 
        </Menu>
      </header>

      <Grid container justify="center" spacing={5}>
        <Grid item>
          <Card className={classes.card}>
            <Typography variant="subtitle1">New cases:</Typography>
            <Typography variant="h4" component="span">
              <CountUp 
                start={0}
                end={countryData.newCases}
                duration={2}
                separator=" "
              />
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <Typography variant="subtitle1">New deaths:</Typography>
            <Typography variant="h4" component="span">
              <CountUp 
                start={0}
                end={countryData.newDeaths}
                duration={2}
                separator=" "
              />
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <div className={classes.header}>


      {
        !isDataLoading ? (
          <ComposedChart width={730} height={250} data={countryData90Days}>
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="newCases" barSize={5} fill="#413ea0" />
          <Line type="monotone" dataKey="newcases" stroke="#ff7300" />
        </ComposedChart>
        ) : (
          (isInitialLoading) ? (
            <span></span>
          ) :
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span>Loading...</span>
            <Skeleton width={500} height={400} />
          </div>

        )
      }
      </div>


    </Container>

    // </ThemeProvider>

  );
}

export default App;
