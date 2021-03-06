const path = require('path');

module.exports = {
    entry: path.resolve(__dirname,'./index.js'),
    output: {
        path: path.join(__dirname, './dist'),   
        filename: 'index.js',  
        libraryTarget: 'umd',    
        publicPath: '/dist/',     
        umdNamedDefine: true
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/react']
                    }
                  }
                ]
              }
        ]
      },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),  
        }
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",   
            commonjs2: "react",    
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
}
