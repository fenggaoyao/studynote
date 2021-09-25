const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app.js'
    },    
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.js$/i,
            use: [{
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-env'],
                    plugins:[[
                        "@babel/plugin-transform-react-jsx",
                        {pragma:"ToyReact.createElement"}
                    ]]
                }
            }],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}