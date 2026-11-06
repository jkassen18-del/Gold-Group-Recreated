// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow importing .webp hero art and other image assets.
config.resolver.assetExts = Array.from(
  new Set([...config.resolver.assetExts, 'webp'])
);

module.exports = config;
