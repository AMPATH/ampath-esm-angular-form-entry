const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options)
  //console.log('externals', singleSpaWebpackConfig.externals)

  singleSpaWebpackConfig.externals['@openmrs/esm-api'] = '@openmrs/esm-api';
  // console.log('webpack', singleSpaWebpackConfig);

  // singleSpaWebpackConfig.module.rules.push({parser: {system: false}})

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig
}