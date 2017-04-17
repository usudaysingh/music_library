# Set Up

## Install Pip
	sudo apt-get install python-pip

## SetUp VirtualEnv

	pip install virtualenv
	mkdir ~/.virtualenvs
	pip install virtualenvwrapper
	export Projects=~/.virtualenvs
	
	Add this line to the end of ~/.bashrc so that the virtualenvwrapper commands are loaded.
	. /usr/local/bin/virtualenvwrapper.sh

## Activate VirtualEnv
	mkvirtualenv Music_Library
	workon Music_Library

## Clone music_library repository
	git clone https://github.com/usudaysingh/music_library.git

## Install Requirements
	pip install -r requirements.txt

## Set Up MySQL
	sudo apt-get install libmysqlclient-dev
	sudo apt-get install mysql-server
	mysql -u root -p --execute "create database music_library; grant all on music_library.* to uday@localhost identified by 'udaysingh';"

## Run Server
	python manage.py runserver
	open localhost:8000 in your browser
