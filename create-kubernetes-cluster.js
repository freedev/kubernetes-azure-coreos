#!/usr/bin/env node

process.execArgv = process.execArgv.filter(function(o){ var x = "--debug-brk"; return o.substring(0, x.length) !== x});

process.env['AZ_LOCATION'] = "North Europe";
process.env['AZ_VM_SIZE'] = "Basic_A4";

var azure = require('./lib/azure_wrapper.js');
var kube = require('./lib/deployment_logic/kubernetes.js');

azure.create_config('kube', { 'etcd': 1, 'kube': 6 });

azure.run_task_queue([
  azure.queue_default_network(),
  azure.queue_storage_if_needed(),
  azure.queue_machines('etcd', 'stable',
    kube.create_etcd_cloud_config),
  azure.queue_machines('kube', 'stable',
    kube.create_node_cloud_config),
]);
