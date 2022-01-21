import axios from "axios";
import { setAxiosHeader } from "../network/authApi";
import { TOKEN_KEY } from "./constants";

const uploadtoS3 = async (files) => {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
  return axios.post("/upload", files).then((res) => {
    const { accessToken } = JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
    setAxiosHeader(accessToken);
    return res.data.locationArray; //return array of URL(s)
  });
};

export default uploadtoS3;
