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
            install: {
                options: {
                    install: false,
                    layout: 'byComponent',
                    targetDir: './build/lib',
                    cleanTargetDir: true,
                    verbose: false
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: [
                        'bower_components/',
                        'src/less/'
                    ]
                },
                files: {
                    'build/css/peoplepool.css': 'src/less/main.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('build', ['bower:install', 'copy:build', 'less:development']);
};
