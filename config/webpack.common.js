/**
 * @author: @brakmic
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

/*
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
const ngcWebpack = require('ngc-webpack');
const WatchIgnorePlugin = require('webpack/lib/WatchIgnorePlugin');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');

const METADATA = {
  port: 3000,
  host: 'localhost',
  title: 'vr-angular',
  urlPrefix: '',
  baseUrl: 'app',
  // aframe: helpers.root('src/vendor/aframe.min.js'),
  isDevServer: helpers.isWebpackDevServer(),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
 var isProd = options.env === 'production';
 return {

   /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {

    'polyfills': './src/init/polyfills.browser.ts',
    'vr': AOT ? './src/init/vr.browser.aot.ts' :
                    './src/init/vr.browser.ts',
    'main':      AOT ? './src/init/main.browser.aot.ts' :
                  './src/init/main.browser.ts'

  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.json', '.css', '.scss', ],

    // An array of directory names to be resolved to the current directory
    modules: [
        helpers.root('src'),
        helpers.root('src/app'),
        helpers.root('node_modules')
    ],
    alias: {
      'request-frame': helpers.root('src/platform/polyfills/request-frame.js'),
      'lodash': helpers.root('node_modules/lodash/index.js'),
      'config.json': helpers.root('src/config.json'),
      'bows': helpers.root('src/platform/helpers/bows-alt.js')
    },

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    rules: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
     /*
         * Typescript loader support for .ts
         *
         * Component Template/Style integration using `angular2-template-loader`
         * Angular 2 lazy loading (async routes) via `ng-router-loader`
         *
         * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
         * order of the loader matter.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         * See: https://github.com/shlomiassaf/ng-router-loader
         */
        {
          test: /\.ts$/,
          use: [
            {
              loader: '@angularclass/hmr-loader',
              options: {
                pretty: !isProd,
                prod: isProd
              }
            },
            { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot: AOT
              }
            },
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json'
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /*
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'themes')]
        //use: ['raw-loader']
      },
      /*
      * Load Sass Styles
      * See: See: https://github.com/jtangelder/sass-loader
      */
      {
        test: /\.scss$/,
        use: ['to-string-loader','css-loader','sass-loader'],
        exclude: [helpers.root('src', 'themes')]
        // use: ['raw-loader', 'sass-loader']
      },
      {
        test: /initial\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader!sass-loader?sourceMap'
          }),
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?v=.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=.+)?$/,
        use: 'file-loader'
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      /* File loader for supporting images, for example, in CSS files.
      */
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: 'file-loader'
      },

    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
    }),

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new CheckerPlugin(),

      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */

      // Specify the correct order the scripts will be injected in
      // new CommonsChunkPlugin({
      //   name: ['polyfills', 'vendor'].reverse()
      // }),

      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),

       // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),

       // Specify the correct order the scripts will be injected in
      new CommonsChunkPlugin({
        name: ['vendor','vr','polyfills']
      }),


      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('src'),
        //resolveNgRoute(helpers.root('src'))
        {

        }
      ),


    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets'
        },
        {
          from: 'src/vendor',
          to: 'vendor'
        },
        {
          from: './favicon.ico'
        },
        {
          from: './manifest.webapp'
        },
        // {
        //   from: 'src/app/sw/default/default.sw.js'
        // },
        // {
        //   from: 'src/app/sw/default/default.sw.map'
        // },
        {
          from: 'src/assets/robots.txt'
        },
        {
          from: 'src/assets/humans.txt'
        },
        {
          from: 'src/config.json'
        }
        ], {
          ignore: [
            'humans.txt',
            'robots.txt'
        ]
      }),


      /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        isDevServer: METADATA.isDevServer,
        favicon: 'favicon.ico',
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      /*
      * Plugin: ScriptExtHtmlWebpackPlugin
      * Description: Enhances html-webpack-plugin functionality
      * with different deployment options for your scripts including:
      *
      * See: https://github.com/numical/script-ext-html-webpack-plugin
      */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      /*
      * Plugin: HtmlHeadConfigPlugin
      * Description: Generate html tags based on javascript maps.
      *
      * If a publicPath is set in the webpack output configuration, it will be automatically added to
      * href attributes, you can disable that by adding a "=href": false property.
      * You can also enable it to other attribute by settings "=attName": true.
      *
      * The configuration supplied is map between a location (key) and an element definition object (value)
      * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
      *
      * Example:
      *  Adding this plugin configuration
      *  new HtmlElementsPlugin({
      *    headTags: { ... }
      *  })
      *
      *  Means we can use it in the template like this:
      *  <%= webpackConfig.htmlElements.headTags %>
      *
      * Dependencies: HtmlWebpackPlugin
      */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      new ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      }),

      new ExtractTextPlugin({ filename: 'initial.css', allChunks: true }),

      new DashboardPlugin(),

      // Fix Angular 2
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.webpack.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      }),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

 };
};

