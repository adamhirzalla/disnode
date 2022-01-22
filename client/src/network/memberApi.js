import axios from "axios";

export const updateRole = async (serverId, memberId, role) => {
  try {
    const res = await axios.put(
      `/api/servers/${serverId}/members/${memberId}`,
      { role }
    );
    return res.data;
  } catch (e) {
    console.log("Failed to retreive message data", e);
  }
};

export const removeMember = async (serverId, memberId) => {
  try {
    const res = await axios.delete(
      `/api/servers/${serverId}/members/${memberId}`
    );
    return res.data;
  } catch (e) {
    console.log("Failed to remove member", e);
  }
};

export const getMembers = async (serverId) => {
  try {
    const res = await axios.get(`/api/servers/${serverId}/members`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive members", e);
  }
};

export const addMember = async (serverId, userId) => {
  try {
    const res = await axios.post(`/api/servers/${serverId}/users/${userId}`);
    return res.data;
  } catch (e) {
    console.log("Failed to retreive members", e);
  }
};
