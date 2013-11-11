#Peoplepool

This is a simple sandbox project. Inspired by the [meteor project][6] and the [trello stack][7], it is meant to test a certain type of architecture (mobile-first, single-page, data-on-the-wire) for web applications.

It's done using [require.js][0] along with [backbone.js][1] together with a set of plugins. Once finished, it will be a proof of technology, providing experience - and eventually documentation - for a wholesale technology stack, containint

 * [grunt][3]
 * [bower][4]
 * (jasmine - still to be added)
 * requirejs
 * backbone, [lodash][2]
 * [bootstrap][5]

This simple demo app takes lets the user create a list of people and edit their profile details.

Features planned for the future are: linking of people to talents and project via qualified associations (using tags).

## Getting started

Check it out

    $ git clone git@github.com:jhohlfeld/peoplepool.git

If not already done, read about [grunt][3] and [bower][4].

In the checked-out project dir, run

    $ bower install

and to compile everything into the `build/` directory:

    $ grunt build

Then, to create a server, cd into 'build/' dir

    $ cd build/

and run a web server (i.e. using python's simple http module)

	$ python -m SimpleHTTPServer 4000

That's it! The server should now run on `localhost:4000` where you can access the project.

----

0: http://requirejs.org/
1: http://backbonejs.org/
2: http://lodash.com/
3: http://gruntjs.com/
4: http://bower.io/
5: http://getbootstrap.com/
6: http://www.meteor.com/
7: http://blog.fogcreek.com/the-trello-tech-stack/
