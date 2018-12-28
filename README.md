
## Description

A Docker container image to run web testing scenarios. Test Suites are described using Jest testing framework. The container comes with Google headless Chrome and Puppeteer.

## Build

You can build this container image using:

```
$ docker build . -t webtest
```

## Test

The docker image comes with a simple test suite called **sum.test.js** that execute a sum operation:

```
$ docker run -it webtest
root@1a10e5d7e98c:~/webtest# npm test

> jest-lab@1.0.0 test /root/webtest
> jest

 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (6ms)

Setup Test Environment.
Teardown Test Environment.
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.681s
Ran all test suites.
```

## Run 

You can add a persistent Docker volume to store your test suites. The volume is mounted in the container running environnement as **/root/webtest/__tests__:

```
$ docker run --mount source=tests-volume,target=/root/webtest/__tests__ -it webtest
```

This Docker image can be retrieved directly from Docker hub (>500MB):

```
$ docker run --mount source=tests-volume,target=/root/webtest/__tests__ -it pmaugeri/webtest:version1
```


