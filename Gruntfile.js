module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildDir: 'build/',
        clean: ['build/*'],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/less/',
                    src: ['*.less', '!bootstrap.less'],
                    dest: 'build/less/'
                }]
            }
        },
        bower: {
            build: {
                dest: 'build/lib/',
                options: {
                    stripJsAffix: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower');

    grunt.registerTask('build', ['clean', 'copy:build', 'bower:build']);

};
