module.exports = {
    presets: [
        ['@babel/preset-typescript'],
        ['@babel/preset-env', { targets: { esmodules: true } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
}
