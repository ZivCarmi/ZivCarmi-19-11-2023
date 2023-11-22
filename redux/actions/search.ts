import { City, CityAPI } from "@/types/city";
import {
  setErrorSuggestions,
  setErrorLocation,
  setIsFetchingSuggestions,
  setIsFetchingLocation,
  setLocation,
  setSuggestions,
} from "../slices/search-slice";
import { AppThunk } from "../store";

export const getSuggestions = (cityQuery: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetchingSuggestions(true));

      const response = await fetch(
        `http://localhost:3000/api/weather/location?query=${cityQuery}`
      );
      const responseJson: CityAPI[] = await response.json();

      const suggestions: City[] = responseJson.map((city: CityAPI) => ({
        city: city.LocalizedName,
        key: city.Key,
        country: city.Country.LocalizedName,
      }));

      dispatch(setSuggestions(suggestions));
    } catch (error) {
      dispatch(setErrorSuggestions("Could not fetch cities suggestions"));
    } finally {
      dispatch(setIsFetchingSuggestions(false));
    }
  };
};

export const getLocation = (cityQuery: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setIsFetchingLocation(true));

      const response = await fetch(
        `http://localhost:3000/api/weather/location?query=${cityQuery}`
      );
      const responseJson: CityAPI[] = await response.json();

      const location: City = {
        city: responseJson[0].LocalizedName,
        key: responseJson[0].Key,
        country: responseJson[0].Country.LocalizedName,
      };

      dispatch(setLocation(location));
    } catch (error) {
      dispatch(setErrorLocation("Could not get city location"));
    } finally {
      dispatch(setIsFetchingLocation(false));
    }
  };
};
