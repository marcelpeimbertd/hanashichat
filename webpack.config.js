const path = require('path');
const webpack = require('webpack');

// unfinished config for server
const serverConfig = {
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'server', 'app', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist', 'public', 'test'),
        filename: "bundle.js"
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            }
        ]
    }
}

// consider improve the clientConfig to aviod mix all the modules in one bundle
const clientConfig = {
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'public', 'app', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist', 'public', 'js'),
        filename: "bundle.js"
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                    }
                }],
            },
            {
                test: /\.(:?(:?jpg)|(:?png))$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    })]
}

module.exports = [/* serverConfig, */ clientConfig]