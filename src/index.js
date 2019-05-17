#!/usr/bin/env node
let program = require('commander');
let package = require('../package.json');
let init = require('../bin/init'); 
program
    .version(package.version)
    .usage('<command> [options]');
program.command('init (template)')
    .description("创新新项目")
    .alias('i')
    .action(function(template){
         init(template);
    }) 
program.parse(process.argv);
if(program.args.length==0){ 
    program.help();
}