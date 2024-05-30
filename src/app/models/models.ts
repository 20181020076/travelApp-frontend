export interface Country {
  id: number;
  name: string;
  code: string;
  currency_code: string;
  cities: City[];
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}
export interface Weather {
  id: number;
  temp: number;
  icon: string;
}
export interface History {
  id?: string;
  weather: number;
  weather_icon: string;
  currency_cop: number;
  converted_currency: number;
  country_id: number;
  city_id: number;
}
