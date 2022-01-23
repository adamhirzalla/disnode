const parseChannels = (channels) => {
  const result = {};
  for (const channel of channels) {
    result[channel.id] = channel;
  }
  return result;
};

module.exports = {
  parseChannels,
};
