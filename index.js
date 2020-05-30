#!/usr/bin/env node
const util = require('util');
const fs = require('fs');
const chalk = require('chalk');
const {lstat} = fs.promises;
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err,filenames)=>{
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename =>{
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const i = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(chalk.green(filenames[i]));
        } else {
            console.log(chalk.blue(filenames[i]));
        }
    }



});


// const lstat = (filename) =>{
//     return new Promise((resolve,reject)=>{
//         fs.lstat(filename,(err,stats)=>{
//             if (err) {
//                 reject(err);
//             }
//             resolve(stats);
//         })
//     })
// }