// Utility to format dates
module.exports = (timestamp) => {
  // Convert the timestamp into a readable date string
  return new Date(timestamp).toLocaleString();
};
