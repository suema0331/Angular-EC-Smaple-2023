import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [new BundleAnalyzerPlugin()],
} as Configuration;
