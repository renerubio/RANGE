const paths = {
  APP_DIR: path.resolve(__dirname, "..", "src"),
};

exports.resolveRoot = [paths.APP_DIR, "node_modules"];

exports.aliases = {
  root: path.resolve(paths.APP_DIR, ""),
  components: path.resolve(paths.APP_DIR, "components"),
  hooks: path.resolve(paths.APP_DIR, "hooks"),
  context: path.resolve(paths.APP_DIR, "context"),
  api: path.resolve(paths.APP_DIR, "api"),
  domain: path.resolve(paths.APP_DIR, "domain"),
  resources: path.resolve(paths.APP_DIR, "resources"),
  mocks: path.resolve(paths.APP_DIR, "mocks"),
};
