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
            main: getReslovePath('src/main.ts')
        },
        output: {
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[hash:8].js',
            path: getReslovePath('dist'),
            publicPath: './'
        },
        resolve: {
            // 将 `.ts` 添加为一个可解析的扩展名。
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                // ... 其它规则
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                //indentedSyntax: true,// 用于处理 sass 文件的配置。
                                data: `
                                    $color: red;
                                `, //可以跨文件共享的全局变量
                            }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
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