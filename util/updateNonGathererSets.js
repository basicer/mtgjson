"use strict";

var base = require("xbase");
var C = require("../shared/C");
var path = require("path");
var runUtil = require("xutil").run;
var tiptoe = require("tiptoe");

tiptoe(
	function updateNonGathererSets()
	{
		base.info("Updating non-gatherer sets...");
		C.SETS_NOT_ON_GATHERER.serialForEach(function(setCode, subcb)
		{
			runUtil.run("node", [path.join(__dirname, "..", "build", "createNonGathererSet.js"), setCode], {"redirect-stderr" : false}, subcb);
		}, this);
	},
	function finish(err)
	{
		if(err)
		{
			base.error(err);
			process.exit(1);
		}

		process.exit(0);
	}
);