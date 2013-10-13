# AngularJS App Skeleton #


## Build with Grunt##

This small repository holds an AngulaJS App Skeleton ready for you to start your Angular Project, including Boostrap for Angular (not JQuery).

Is build with Grunt, the JavaScript task runner, to know more about Grunt visit
	
	http://gruntjs.com 
	
in order to run Grunt, you first need to install NodeJS from the website.

    http://nodejs.org 

Then, install the Grunt command line interface.

    npm install -g grunt-cli

Then, get this code and run

    npm install

Last, run the defaul task

    grunt run

Then, you can visit your local server mounted by Grunt at localhost:3001

## Directory Structure ##

	/node_modules ................. npm registered node modules
	/public ....................... compiled application files
	|-- /css ...................... compiled css
	|-- /js ....................... compiled js modules
	/src .......................... source directory
	|-- /assets ................... assets like images
	|-- /scripts .................. javascript source
	|-- |-- /vendor ............... javascript libraries(angular and boostrap)
	|-- /styles ................... sass source
	|-- |-- /vendor ............... sass vendor styles (boostrap)
	|-- /html ..................... html pages
	.gitignore .................... git ignore directives
	GruntFile.js .................. grunt file
	package.json .................. grunt package information
	README.md ..................... readme file


## Grunt Tasks ##
 
Generate a local development build

    grunt run

## Contact ##

If you need more info, just contact me at:
	
	mail@kevinblanco.io
	Skype: kevinblanco.io
	@KevinBlancoZ