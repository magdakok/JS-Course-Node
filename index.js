#!/usr/bin/env node
const util = require('util');
const fs = require('fs');
const {lstat} = fs.promises;

fs.readdir(process.cwd(), async (err,filenames)=>{
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename =>{
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const i = allStats.indexOf(stats);
        console.log(filenames[i], stats.isFile());
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