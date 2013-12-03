

jsFiles = $(wildcard   *.js)


hint:
	echo $(jsFiles)
	jshint $(jsFiles)