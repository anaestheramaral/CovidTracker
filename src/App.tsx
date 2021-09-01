import { Card, CssBaseline, ListItemText, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { handleGetCountryData, handleGetRegions } from './utils/api';
import {Button} from '@material-ui/core';
import { Menu } from './components/Menu';
import dataRange from 'date-range-array';
import { getXdaysfromToday } from './utils/toIsoString';


// icons
// import CloseIcon from '@material-ui/icons/Close';
// import ListIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

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
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countryData, setCountryData] = useState<CountryData>({
    date: "",
    newCases: 0,// confirmed_diff
    newDeaths: 0,
  })
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

  useEffect(()=> {
    handleSetRegions();
    const date = getXdaysfromToday(1);
    handleGetCountryData('CHN', date)
  },[])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelectCountry = (event: React.MouseEvent<HTMLElement>, region: Region) => {
    setSelectedCountry(region.name);
    handleCountryData(region.iso);
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <ThemeProvider theme={Theme}>
    <div>
      <h1>Covid19 Tracker</h1>
      <CssBaseline />
      {/* {regions.map(region=> {
        return (
          <div key={region.name}>{region.name}</div>
        )
      })} */}
      <Button
        endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
        onClick={handleOpenMenu}
      >
        {!anchorEl ? selectedCountry : 'Select country'}
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

      <Card>Novos Casos: {countryData.newCases}</Card>
    </div>

    // </ThemeProvider>

  );
}

export default App;
