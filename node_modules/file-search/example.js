var FileSearch = require('./index');

var d = new Date();
d.setDate(d.getDate() - 1);

var finder = new FileSearch({
    rootFolder : '/Users',
    fileModifiedDate : d
});

finder.on('match', function(strPath, stat) {
    console.log(strPath + ' - ' + stat.mtime);
});

finder.on('complete', function() {
    console.log('Finished');
});

finder.on('patherror', function(err, strPath) {
    console.log('Error for Path ' + strPath + ' ' + err);
});

finder.on('error', function(err) {
    console.log('Global Error ' + err);
});

finder.start();
