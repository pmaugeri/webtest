FROM ubuntu

ENV workdir='/root/webtest/'

# Create folders
RUN mkdir $workdir
RUN mkdir $workdir/lib
RUN mkdir $workdir/__tests__

WORKDIR $workdir

#
# Add main packages 
#
RUN apt-get upgrade
RUN apt-get update
RUN apt-get -y install nodejs npm wget vim
RUN npm init -y
RUN npm install --save-dev jest-puppeteer puppeteer jest

COPY jest.config.js $workdir
COPY package.json $workdir
COPY puppeteer_environment.js $workdir
COPY setup.js $workdir
COPY teardown.js $workdir

#
# Include a simple test suite example
#
COPY sum.js $workdir
COPY sum.test.js $workdir

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# Add libraries
COPY lib/AkamaiPragmaHeaders.js $workdir/lib


