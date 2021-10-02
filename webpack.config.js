// import { argv } from "process";

// require("@babel/polyfill");
let config = {
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    entry: ["./main/electron.ts"],
    target: "electron-main",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: "ts-loader" }],
            },
        ],
    },
    node: {
        __dirname: false,
    },
    externals: {
        sequelize: "require('sequelize')",
    },
    output: {
        path: __dirname + "/public",
        filename: "electron.js",
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }
    return config;
};
