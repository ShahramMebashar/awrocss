module.exports = {
  sass: {
    src: __dirname + '/src/sass/**/*.scss',
    dest: __dirname + '/css',
  },
  js: {
    src: __dirname + '/src/js/**/*.js',
    dest: __dirname + '/js',
  },
  imgs: {
    src: __dirname + '/src/assets/images',
    dest: __dirname + '/assets/images',
  },
  watch: {
    sass: __dirname + '/src/sass/**/*.scss',
    js: __dirname + '/src/js/**/*.js',
  },
};
