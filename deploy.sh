#!/bin/bash

export PORT=5410
export MIX_ENV=prod
export GIT_PATH=/home/jobPortal/src/jobPortal

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "jobPortal" ]; then
	echo "Error: must run as user 'jobPortal'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/jobPortal ]; then
	echo mv ~/www/jobPortal ~/old/$NOW
	mv ~/www/jobPortal ~/old/$NOW
fi

mkdir -p ~/www/jobPortal
REL_TAR=~/src/jobPortal/_build/prod/rel/jobPortal/releases/0.0.1/jobPortal.tar.gz
(cd ~/www/jobPortal && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/jobPortal/src/jobPortal/start.sh
CRONTAB

#. start.sh
