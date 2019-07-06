var pxtoviewport = require('postcss-px-to-viewport');

function regexEquals(firstValue,secondValue){
    return firstValue+'' == secondValue +'';
}
const addPostCssPlugins = [
    pxtoviewport({
        viewportWidth: 750,
        viewportHeight: 1334,
        unitPrecision: 5,
        viewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false
    })
]
module.exports = (config, options) => {
//   console.log(config.module.rules);
  let rules = config.module.rules;
  let styleRules = rules.filter(rule => {
      let test = rule.test;
      return regexEquals(test,/\.css$/)|| regexEquals(test,/\.scss$|\.sass$/)|| regexEquals(test,/\.less$/)|| regexEquals(test,/\.styl$/);
  });
//   console.log(styleRules)
  styleRules.forEach(rule => {
    //   console.log(rule);
     let currentPostCssLoader = rule.use.find(loader => loader.loader==='postcss-loader');
     let getPluginsFn = currentPostCssLoader.options.plugins;
     let getPluginsAddedFn = (loader)=>{
         return [...getPluginsFn(loader),...addPostCssPlugins];
     }
     currentPostCssLoader.options.plugins = getPluginsAddedFn;
    //  console.log(typeof currentPostCssLoader.options.plugins)
    //  console.log(currentPostCssLoader.options.plugins())
    //  currentPostCssLoader.options.plugins.push(...addPostCssPlugins);
  })
  return config;
};