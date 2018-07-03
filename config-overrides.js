const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');


// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = function override(config, env) {
  // config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess(config, env, {
     modifyVars: {
      // defaults from antd
      // https://ant.design/docs/spec/colors
      //
      // "@primary-color": "#1DA57A",
      "@body-background": "#F5F8FA",
      "@primary-color"          : "@orange-6",
      "@info-color"             : "@blue-6",
      "@success-color"          : "@green-6",
      "@error-color"            : "@red-6",
      "@highlight-color"        : "@red-6",
      "@warning-color"          : "@yellow-6",
      "@normal-color"           : "#d9d9d9",
      "@layout-body-background": "#F5F8FA",
      // "@layout-header-background": "#404040",
      "@layout-header-background": "@cyan-10",
      "@layout-header-height": "64px",
      "@layout-header-padding": "0 50px",
      "@border-radius-base": "0px",
      "@border-radius-sm": "0px",
      //  "Open+Sans:400italic,400|Oswald:400,700",
      "@font-family-no-number": '-apple-system, BlinkMacSystemFont, sans-serif',
      // "@font-family": '"Helvetica Neue For Number", @font-family-no-number',
      "@font-family": '"Open Sans", "Oswald", sans-serif, @font-family-no-number',
      "@code-family": "Consolas, Menlo, Courier, monospace",
     },
  });
  return config;
};
