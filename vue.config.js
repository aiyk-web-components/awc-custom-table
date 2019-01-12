const path = require("path");

module.exports = {
    css: {
        extract: false
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [path.resolve(__dirname, "./src/style.scss")]
        }
    }
};