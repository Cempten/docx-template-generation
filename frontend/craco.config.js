const path = require('path')

const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@components/*': resolvePath('./src/components/*'),
      '@hooks': resolvePath('./src/components/hooks'),
      '@hooks/*': resolvePath('./src/components/hooks/*'),
      '@store': resolvePath('./src/components/store'),
      '@store/*': resolvePath('./src/components/store/*'),
    },
  },
}
