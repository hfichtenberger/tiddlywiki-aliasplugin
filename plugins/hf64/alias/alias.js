/*\
title: $:/plugins/hf64/alias/alias.js
type: application/javascript
module-type: macro

Copyright 2016 Hendrik Fichtenberger

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "alias";

exports.params = [
	{ name: "alias" },
	{ name: "text" },
	{ name: "smartlink" }
];

/*
Run the macro
*/
exports.run = function(alias, text, smartlink) {
	if( !alias) {
    return "ERROR: No alias provided to AliasMacro";
  }
	var tiddlers = $tw.wiki.getTiddlers();
	var match = "";
  for(var t = 0; t < tiddlers.length; t++) {
		var tiddler = $tw.wiki.getTiddler(tiddlers[t]);
		if( tiddler.fields["alias"] ) {
			var aliases = tiddler.fields["alias"].split(";");
			if( aliases.indexOf(alias) >= 0 ) {
				match = tiddlers[t];
			}
		}
	}
	if( !match && smartlink ) {
		return text;
	}
	else if( !text) {
		return "[[" + match + "]]";
	}
	else {
		return "[[" + text + "|" + match + "]]";
	}
};

})();
