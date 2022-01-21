import axios from "axios";

export const getUser = async (userId) => {
  try {
    const res = await axios.post(`/api/users/${userId}`);
    const user = res.data;
    return user;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive user data", e);
  }
};

export const updateProfile = async (userId, profile) => {
  try {
    const res = await axios.patch(`/api/users/${userId}`, { profile });
    const user = res.data;
    return user;
    // const sio = await import("../socket/index");
    // console.log("Started a socket:", sio);
  } catch (e) {
    console.log("Failed to retreive user data", e);
  }
};

export const getIcons = async () => {
  try {
    const res = await axios.get(`api/icons`);
    const icons = res.data;
    return icons;
  } catch (e) {
    console.log("Failed to retreive icons data", e);
  }
};
