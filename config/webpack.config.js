const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


function getReslovePath(...args) {
    return path.resolve(__dirname, '../' + args.join('/'));
}

module.exports = function (env = {}, argv) {
    const isProduction = env.production ? true : false;

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-maps' : 'inline-source-map',
        entry: {
            main: getReslovePath('src/main.js')
        },
        output: {
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[hash:8].js',
            path: getReslovePath('dist'),
            publicPath: './'
        },
        module: {
            rules: [
                // ... 其它规则
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [getReslovePath('dist')]
            }),
            new HtmlWebpackPlugin({
                title: 'Gumx',
                base: '/',
                template: getReslovePath('public/index.html'),
                filename: 'index.html'
            })
        ]
    };
};