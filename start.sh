#!/bin/bash

export PORT=5410

cd ~/www/jobPortal
./bin/jobPortal stop || true
./bin/jobPortal start
