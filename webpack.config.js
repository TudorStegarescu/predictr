module.exports = {
  entry: ['./node_modules/angular/angular.js',
          './bower_components/firebase/firebase.js',
          './node_modules/angular-ui-router/release/angular-ui-router.min.js',
          './node_modules/angularfire/dist/angularfire.min.js',
          './node_modules/angular-animate/angular-animate.min.js',
          './node_modules/angular-aria/angular-aria.min.js',
          './node_modules/angular-material/angular-material.min.js',
          './node_modules/angular-messages/angular-messages.min.js',
          './node_modules/angular-resource/angular-resource.js',
          './src/app.js',
          './src/betting/betting.js',
          './src/frontpage/frontpage.js',
          './src/data/dataService.js',
          './src/user/userService.js',
          './src/auth/authService.js',
          './src/components/firebase.utils.js',
          './src/menu/menu.js',
          './src/user/user.js',
          './src/teams/teams.js',
          './src/auth/authController.js'],
  output: {
    path: __dirname + "/src",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/bower_components/, /node_modules/],
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.es6/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    extension: ['', '.js', '.es6']
  },
  watch: true
}
