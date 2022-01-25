import axios from "axios";

// accept friend request
export const acceptRequest = async (senderId) => {
  try {
    const res = await axios.put(`/api/friends/${senderId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};

// send friend request
export const sendRequest = async (receiverId) => {
  try {
    const res = await axios.post(`/api/requests/${receiverId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};

// reject friend request / cancel friend request
export const removeRequest = async (requestId) => {
  try {
    const res = await axios.delete(`/api/requests/${requestId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};
