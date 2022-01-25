import axios from "axios";

// get all friends
export const getFriends = async () => {
  try {
    const res = await axios.get(`/api/friends`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive friends data", e);
  }
};

// get all friend requests
export const getRequests = async () => {
  try {
    const res = await axios.get(`/api/requests`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};

// accept friend request
export const acceptRequest = async (senderId) => {
  try {
    const res = await axios.put(`/api/friends/${senderId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};

// reject friend request
export const rejectRequest = async (senderId) => {
  try {
    const res = await axios.put(`/api/requests/${senderId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive requests data", e);
  }
};
