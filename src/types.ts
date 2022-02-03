export type RadioStations = {
  stationuuid: string;
  serveruuid: null;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  iso_3166_2: null;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  lastchangetime: Date;
  lastchangetime_iso8601: Date;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: Date;
  lastchecktime_iso8601: Date;
  lastcheckoktime: Date;
  lastcheckoktime_iso8601: Date;
  lastlocalchecktime: Date;
  lastlocalchecktime_iso8601: Date;
  clicktimestamp: Date;
  clicktimestamp_iso8601: Date;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat: null;
  geo_long: null;
  has_extended_info: boolean;
};

export type Station = {
  streamUrl: string;
  token: string;
  title: string;
  artUrl: string;
};

export type RadioApiFilter = {
  limit: number;
  country: string;
  codec: string;
  is_https: boolean;
  hidebroken: boolean;
};
