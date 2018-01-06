module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },
    "rules": {
        "comma-dangle": ["warn", "never"],
        "react/jsx-filename-extension": "off",
        "max-len": ["error", 120],
        
        // Has bug for custom propTypes
        "react/no-typos": "off"
    }
};