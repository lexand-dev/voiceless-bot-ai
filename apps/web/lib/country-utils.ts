import * as ct from "countries-and-timezones";

export function getCountryFromTimezone(timezone?: string) {
  if (!timezone) {
    return null;
  }

  const timezoneInfo = ct.getTimezone(timezone);
  if (!timezoneInfo?.countries.length) {
    return null;
  }

  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);

  return {
    code: countryCode,
    name: country?.name || countryCode
  };
}

export const getFlagByCountryCode = (countryCode: string) => {
  if (!countryCode) {
    return null;
  }
  return `https://flagsapi.com/${countryCode.toLocaleUpperCase()}/flat/64.png`;
};
