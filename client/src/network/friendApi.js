import axios from "axios";

export const getFriends = async () => {
  try {
    const res = await axios.get(`/api/friends`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive channel data", e);
  }
};
