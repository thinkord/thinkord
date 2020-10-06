// require("@babel/polyfill");
module.exports = [
    {
        mode: 'development',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'source-map',
        entry: ['./main/electron.ts'],
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'ts-loader' }]
                }
            ]
        },
        node: {
            __dirname: false
        },
        externals: {
            "sequelize": "require('sequelize')",
        },
        output: {
            path: __dirname + '/public',
            filename: 'electron.js'
        }
    }
];