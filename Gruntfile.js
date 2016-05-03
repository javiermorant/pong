module.exports = function(grunt) {
grunt.initConfig({
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['src/js/controller/paddleControls.js', 
            'src/js/model/data.js', 
            'src/js/controller/pong.js',
            'src/js/game.js'],
      dest: 'WebContent/js/all.js',
    },
  },
  
  clean:{
  	build: ['WebContent/']
  },
  
  uglify: {
	    build: {
	        src: 'WebContent/js/all.js',
	        dest: 'WebContent/js/all.min.js'
	    }
	},
//	qunit: {
//		  files: ['dist/test/**/*.html']
//		},
		
    copy: {
        js: {
          files: [{
            expand: true,
            cwd: 'src/js/',
            src: '**/*',
            dest: 'WebContent/debug/'
          }]
        },
        htmlDebug: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: 'debug.html',
              dest: 'WebContent/'
            }]
          },
          html: {
              files: [{
                expand: true,
                cwd: 'src/',
                src: 'pong.html',
                dest: 'WebContent/'
              }]
            }
//	,
//        
//        tests: {
//            files: [{
//              expand: true,
//              cwd: '',
//              src: 'test/**/*',
//              dest: 'dist/'
//            }]
//          }
      }
});
//3. Where we tell Grunt we plan to use this plug-in.
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-clean');

// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
grunt.registerTask('clear', ['clean']);
grunt.registerTask('deploy', ['clean','concat','uglify','copy:html']);
grunt.registerTask('default', ['clean','concat','uglify','copy']);

}