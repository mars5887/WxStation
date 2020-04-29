import {SEARCH_WX, SEARCH_WX_HOURLY, SEARCH_SUCCESS, SEARCH_HOURLY_SUCCESS, QUERY_ERROR} from './epics';

export const searchWx = (searchPayload) => {
  return {
    payload: {
      ...searchPayload,
    },
    type: SEARCH_WX,
  };
};

export const searchWxHourly = (searchPayload) => {
  return {
    payload: {
      ...searchPayload,
    },
    type: SEARCH_WX_HOURLY,
  };
};

export const searchWxSuccess = (responsePayload) => {
  console.log("searchWxSuccess"+responsePayload);

  return {
    
    payload: {
      ...responsePayload,
    },
    type: SEARCH_SUCCESS,
  };
};

export const searchHourlyWxSuccess = (responsePayload) => {
  console.log("searchWxSuccess"+responsePayload);

  return {
    
    payload: {
      ...responsePayload,
    },
    type: SEARCH_HOURLY_SUCCESS,
  };
};

export const searchWxError = (errorPayload) => {
  return {
    payload: {
      ...errorPayload,
    },
    type: QUERY_ERROR,
  };
};