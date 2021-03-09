"use strict";

const esbuild = require('esbuild');
const glob = require('glob');
const fs = require('fs');

const outdir = 'build';

esbuild.build({
    entryPoints: ['src/main.js'],
    outdir: outdir,
    bundle: true,
    minify: true,
    sourcemap: true
}).catch(() => process.exit(1));

// minify some other javascript files (but don't bundle)
var jsfiles = ['src/serviceworker.js'].concat(glob.sync('src/electron-*.js'));
esbuild.build({
    entryPoints: jsfiles,
    outdir: outdir,
    bundle: false,
    minify: true,
    sourcemap: false
});

// now minify all the CSS files
var cssfiles = glob.sync('src/css/**/*.css');

esbuild.build({
    entryPoints: cssfiles,
    outdir: outdir + '/css',
    bundle: false,
    minify: true,
    sourcemap: true,
}).catch(() => process.exit(1));

// now copy a bunch of other files
var patterns = ["**/*.html",
                "**/*.svg",
                "**/*.png",
                'assets/audio/*',
                "../package.json",
                "manifest.json",
                "manifest.webapp",
                "webapp.manifest.json"
               ];

for (var idx in patterns) {
    glob("src/" + patterns[idx], function(err, files) {
        if (err) throw err;

        for (var fidx in files) {
            var infile = files[fidx];
            var segs = infile.split('/');
            // for package.json, need to remove the '../'
            segs = segs.filter(function(seg) { return seg != ".."; });
            // change src to build dir
            segs[0] = outdir;

            var outfile = segs.join('/');
            var outfilepath = segs.slice(0, segs.length - 1).join('/');

            // console.log('Copying', infile, 'to', outfile, 'in', outfilepath);

            // make sure the target directory exists
            fs.mkdirSync(outfilepath, {'recursive': true});

            // now copy file (async)
            fs.copyFile(infile, outfile, (err) => {
                if (err) throw err;
            });
        }
    });
}
