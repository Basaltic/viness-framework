module.exports = {
    root: true,
    // This tells ESLint to load the config from the package `eslint-config-viness`
    extends: ['viness'],
    settings: {
        next: {
            rootDir: ['apps/*/']
        }
    }
}
