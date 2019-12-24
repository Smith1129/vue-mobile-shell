module.exports = {
    lintOnSave: false, // 关闭eslint规范
    css: {
        loaderOptions: {
            postcss: {
                plugins: [

                    // 把px单位换算成rem单位
                    require("postcss-import")({}),
                    require("postcss-url")({}),
                    require("postcss-aspect-ratio-mini")({}),
                    require("postcss-write-svg")({
                        utf8: false
                    }),
                    require("postcss-cssnext")({}),
                    require("postcss-px-to-viewport")({
                        viewportWidth: 375,
                        unitPrecision: 3,
                        viewportUnit: "vw",
                        selectorBlackList: [
                            ".ignore",
                            ".hairlines"
                        ],
                        minPixelValue: 1,
                        mediaQuery: false
                    }),
                    require("postcss-viewport-units")({
                        silence: true,
                        filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
                    }),
                    require("cssnano")({
                        preset: "advanced",
                        autoprefixer: false,
                        "postcss-zindex": false
                    }),

                    /* require("postcss-pxtorem")({
                        rootValue: 37.5,
                        propList:["*"]
                    }) */
                ]
            }
        }
    },
    devServer: {
        open: true
    }
}