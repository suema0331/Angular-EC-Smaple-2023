import { Configuration } from 'webpack';

export default {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
} as Configuration;
