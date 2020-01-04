module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },
    "rules": {
        "arrow-parens": "off",
        "comma-dangle": ["warn", "never"],
        "react/jsx-filename-extension": "off",
        "max-len": ["error", 120],

        // Has bug for custom propTypes
        "react/no-typos": "off",

        "react/jsx-one-expression-per-line": "off",
        "react/prop-types": "off"
    }
};