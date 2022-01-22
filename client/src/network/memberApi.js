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
