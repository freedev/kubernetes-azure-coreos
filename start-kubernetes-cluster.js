#!/usr/bin/env node

process.execArgv = process.execArgv.filter(function(o){ var x = "--debug-brk"; return o.substring(0, x.length) !== x});

process.env['AZ_LOCATION'] = "North Europe";
process.env['AZ_VM_SIZE'] = "Basic_A4";

var azure = require('./lib/azure_wrapper.js');
var kube = require('./lib/deployment_logic/kubernetes.js');

azure.machines_start();
