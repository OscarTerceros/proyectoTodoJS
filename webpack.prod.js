const HtmlWebPack     = require('html-webpack-plugin');
const MiniCssExtract  = require('mini-css-extract-plugin');
const CopyPlugin      = require('copy-webpack-plugin');
const CssMinimizer    = require('css-minimizer-webpack-plugin');
const Terser          = require('terser-webpack-plugin');

module.exports = {

  mode: 'production', //establece como modo desarrolador
  
  output: {
    clean: true, //borra los archivos creados con anterioridad en la carpeta dist
    filename: 'main.[contenthash].js'
  },

  module: {
    rules:[ //declaracion de reglas
      {
        test: /\.html$/i, //si es un archivo html
        loader: 'html-loader', 
        options: {
          sources: false,
          minimize: false, //para minimizar el código (index.html)
        },
      },
      {
        test   : /\.css$/,
        exclude: /styles.css$/,
        use    : [ 'style-loader', 'css-loader' ]
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, 'css-loader']  
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizer(), 
      new Terser(), 
    ]
  },

  plugins: [
    new HtmlWebPack({
      template: './src/index.html', //archivo en el que se basa para realizar el bundle
      filename: './index.html'
    }),
    new MiniCssExtract({ //Crea el archivo css global en la carpeta dist
      filename: '[name].[fullhash].css', //[hash] genera un nombre unico cada vez que se actualiza el css
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
  ]
}