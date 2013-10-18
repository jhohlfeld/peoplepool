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
        },
        less : {
            development : {
                options : {
                    paths: [
                        'bower_components/bootstrap/less/',
                        'src/less/'
                    ]
                },
                files: {
                    'build/css/peoplepool.css' : 'src/less/main.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('build', ['clean', 'copy:build', 'bower:build', 'less:development']);

};
