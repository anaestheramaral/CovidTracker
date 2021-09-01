import axios from 'axios';

const url = 'https://covid-api.com/api';

interface CountryData {
  date: string;
  newCases: number; // confirmed_diff
  newDeaths: number; // deaths_diff
}
interface Regions {
  data: {
    data: Region[]
  }
}
interface Region {
    iso: string;
    name: string;
}
export const handleGetRegions = async () => {
  const response:Regions = await axios.get(`${url}/regions`)

  return response.data
}

export const handleGetCountryData = async (iso: string, date: string) => {
  // const newDate = toIsoString(date);

  const response = await axios.get(`${url}/reports/total?date=${date}&iso=${iso}`);

  console.log(response.data.data)

  const data: CountryData = {
    date: response.data.data.date,
    newCases: response.data.data.confirmed_diff,
    newDeaths: response.data.data.deaths_diff,
  }

  console.log(data)
  return data
}


