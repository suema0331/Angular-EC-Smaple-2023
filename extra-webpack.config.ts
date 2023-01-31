import { Configuration } from 'webpack';

export default {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  // plugins: [new BundleAnalyzerPlugin()],
} as Configuration;
