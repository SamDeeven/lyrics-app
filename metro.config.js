// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// // Prevent Metro from using global Expo installation
// config.resolver.blockList = [
//   /node_modules[\/\\]expo[\/\\]node_modules[\/\\]metro-runtime/
// ];

// module.exports = config;


const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;