/* global require, module */

/**
 * Adopted from bensudbury
*/

var fs = require('fs'),
    async = require('async'),
    path = require('path'),
    util = require('util'),
    events = require('events');

var EventEmitter = events.EventEmitter;

var FileSearch = function(options) {

    this.options = options || {};

    if (options.fileModifiedDate) {
	options.filterFunction = function (strPath, fsStat) {
            return (fsStat.mtime > options.fileModifiedDate) ? true : false;
        };
    }

    this.recurseFolder = function(strFolderName, folderCompleteCallback) {
	var self = this;

	fs.readdir(strFolderName, function(err, files) {
            if (err) {
                pathError(err, strFolderName);
                folderCompleteCallback(err);
		return;
            }
            if (!files) {
                folderCompleteCallback(null);
		return;
            }

            async.each(files, function(file, callback) {

		// Ignore hidden files
		if (file.indexOf('.') === 0) {
		    callback(null);
		    return;
		}

		// Don't return error to callback or we will miss other files in directory
		try {
		    var strPath = path.join(strFolderName, file);
		} catch(e) {
                    pathError(e, strPath);
                    callback(null); 
		    return;
                }

                fs.lstat(strPath, function(err, stat) {
                    if (err) {
                        pathError(err, strPath);
                        callback(null);
			return;
                    }
                    if (!stat) {
                        pathError(new Error('Could not get stat for file ' + strPath), strPath);
                        callback(null);
			return;
                    }
                    if (stat.isDirectory()) {
                        checkMatch(strPath, stat);
                        self.recurseFolder(strPath, function(err){
                            if (err) pathError(err, strPath);
                            callback(null);
			    return;
                        });
                    } else {
                        checkMatch(strPath, stat);
                        callback(null);
			return;
                    }
                });

            }, function(err){
		if (err) pathError(err, strFolderName);
		folderCompleteCallback(err);
		return;
            });
        });

        function pathError(err, strPath) {
            try {
                self.emit('patherror', err, strPath);
            } catch(e) {
                //Already emitted a path error and the handler failed must not throw error or other files will fail to process too
                self.emit('error', new Error('Error in path Error Handler' + e));
            }
        }

        function checkMatch(strPath, stat) {
            try {
                if (self.options.filterFunction(strPath, stat)) {
                    self.emit('match', strPath, stat);
                }
            } catch (e) {
                pathError(e, strPath);
            }
        }
    };

    this.start = function() {
	var self = this;
        self.recurseFolder(self.options.rootFolder, function(err) {
            if (err) {
                self.emit('error', err);
                return;
            }
            self.emit('complete');
        });
    };
};

util.inherits(FileSearch, EventEmitter);

module.exports = FileSearch;
