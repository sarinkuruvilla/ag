# Artist Growth Marketing Site

This repository contains the source code for the Artist Growth marketing web
site. The site itself is hosted on Github Pages, currently from the `master`
branch of this repository. That is intended to change at some point in the
future.

## Getting Started

The marketing site uses [Bower](http://bower.io/) to manage most of its external
dependencies and [Grunt](http://gruntjs.com/) to perform builds. While you will
only need Bower for updating dependencies, Grunt is highly recommended.

Instructions for installing Grunt can be found [here](http://gruntjs.com/getting-started).

## General Development

To start up a development environment, simply enter

```shell
grunt
```

from the command line. This will perform a quick development build, fire up a
web server, and open the site in your default browser. It will also spin up a
watch task to compile your LESS files when they are saved and automatically
refresh your browser. You can press `ctrl-C` to shut down the monitoring
process and web server.

## Production Builds

To test a production build, use the following command:

```shell
grunt --target=prod
```

This will run the production build process and load the results on a local web
server, as with the development build. Unlike the development build, this will
not be monitored for changes to the source. You can press `ctrl-C` to shut down
the web server.

## Publishing

Deployment is performed by committing the output of the production build to an
appropriate branch on GitHub. The commit will always be made to the same
repository from which Grunt was executed. What this means is that, if you are
working on your personal fork, it will commit and push to a branch in your
personal fork.

To perform a deployment, use the command:

```shell
grunt deploy --branch=<branch>
```

The `branch` option can be one of `master`, `gh-pages`, or `test`. If no value
is specified, it will default to `test`. Executing this command will first
perform a production build. It will then commit the build output to the
specified branch and push it to GitHub.

As the deployment will completely replace the contents of the target branch, you
should take care when using anything other the `test` option.

## All the Tasks!

The following is a list of all of the tasks available via Grunt. They are all
variations of the two primary tasks above.

All of the tasks below accept an optional `--target=<target>` flag, where
`<target>` is one of either `dev` or `prod`. If you do not explicitly specify a
target, then `dev` will be used.

### The "build" task

Performs a build and nothing more. A production build is far more involved than
a development build.

```shell
grunt build
```

### The "server" task

Launches a local web server and opens it in your default browser. If the target
environment is `dev`, this will also watch your source code for changes and
compile/reload as required.

```shell
grunt server
```

The web server and watch process will run until you press `ctrl-C` to exit.
