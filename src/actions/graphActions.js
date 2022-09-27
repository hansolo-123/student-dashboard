import { GET_GRAPH } from "./types";
import mockdata from "../data/mockdata.csv";
import Papa from "papaparse";

export const getGraph = () => (dispatch) => {
  return new Promise((resolve, reject) =>
    Papa.parse(mockdata, {
      header: true,
      delimiter: "",
      download: true,
      dynamicTyping: true,
      complete: resolve,
      error: reject,
    })
  ).then(({ data }) =>
    dispatch({
      type: GET_GRAPH,
      payload: data,
    })
  );
};
