module.exports = env => {
    env = env || {};
    debugger;

    const OUTPUT_DIR = env['OUTPUT_PATH'] || __dirname + "/target";
    const JS_OUTPUT_DIR = OUTPUT_DIR + "/js"
    const CSS_OUTPUT_DIR = OUTPUT_DIR + "/css"
    let p = require('@plastique/core');
    let Plastique = p.Plastique;
    let CompilePlugin = p.CompilePlugin;
    let LibraryPlugin = p.LibraryPlugin;
    let path = require("path");
    const i18nDirs = [
        path.join(__dirname, "node_modules/plastique-components/i18n"),
        path.join(__dirname, "i18n"),
    ];
    let transformer = new Plastique({
        outputDir: JS_OUTPUT_DIR,
        i18nDir: i18nDirs,
        i18nOutputFileName: "app.locale"
    });
    return [{
        target: 'web',
        resolve: {
            extensions: ['.ts']
        },
        context: __dirname,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig.json",
                        getCustomTransformers: (program) => ({
                            before: [transformer]
                        })
                    }
                }
            ]
        },
        entry: {
            'main': './src/Main.ts',
        },
        plugins: [
            new LibraryPlugin({
                'axios': path.join(__dirname, 'static/js', 'axios.min.js'),
                'process': null,
            }),
            new CompilePlugin()
        ],
        output: {
            filename: '[name].js',
            path: JS_OUTPUT_DIR,

        },
        optimization: {
            minimize: false
        },
    },
    {
        resolve: {
            extensions: ['.styl']
        },

        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].min.css'
                            }
                        },
                        {
                            loader: 'stylus-loader',

                            options: {
                                stylusOptions: {
                                    include: [path.join(__dirname, "./node_modules/")],
                                    includeCSS: true,
                                    compress: true,
                                },
                            },
                        }
                    ]
        }
            ],
        },
        entry: {
            'style': './style/style.styl',
        },
        output: {
            filename: '[name].css',
            path: CSS_OUTPUT_DIR,
        },
        optimization: {
            minimize: true
        }
    }];
};