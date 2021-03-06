var util = require('../../util');

exports.run = function(info) {
	var cmd = cmds[info.cmdstr];
	if(cmd) {
		cmd(info);
	}
};

function listArgsCommand(func, info) {
	var sp = info.rest.toLowerCase().split(' ')
	  , name = sp.shift()
	  , args = {}
	  ;

	info.name = name;
	
	for(var i = 0; i < sp.length; i++) {
		var arg = sp[i].split(':');
		if(arg.length > 1) {
			args[arg[0]] = arg[1].split(',');
		} else {
			args[arg[0]] = [];
		}
	}

	info.bot[func](name, args);
}

var cmds = {
	load: function(info) {
		listArgsCommand('loadPlugin', info);
		info.bot.respond(info, 'Plugin loaded: ' + info.name);
	},
	unload: function(info) {
		listArgsCommand('unloadPlugin', info);
		info.bot.respond(info, 'Plugin unloaded: ' + info.name);
	}
};
