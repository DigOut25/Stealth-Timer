const { withAndroidStyles } = require('@expo/config-plugins');

module.exports = function withFixSplashScreen(config) {
  return withAndroidStyles(config, async config => {
    const styles = config.modResults;
    const resources = styles.resources;
    const styleArray = resources.style;

    if (styleArray) {
      styleArray.forEach(style => {
        if (style.$.name === 'Theme.App.SplashScreen') {
          style.item = style.item?.filter(
            item =>
              item.$.name !== 'windowSplashScreenAnimatedIcon' &&
              item.$.name !== 'android:windowSplashScreenBehavior'
          );
        }
      });
    }

    return config;
  });
};
