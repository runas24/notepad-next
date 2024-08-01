const fs = require('fs');
const path = require('path');
const moment = require('moment');

const backupDir = path.join(__dirname, 'Backup');
const projectDir = __dirname;

if (!fs.existsSync(backupDir)){
    fs.mkdirSync(backupDir);
}

function backup() {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const backupPath = path.join(backupDir, `backup_${timestamp}.zip`);

    const exec = require('child_process').exec;

    exec(`zip -r ${backupPath} ${projectDir} -x ${backupDir}/*`, (error) => {
        if (error) {
            console.error(`Error creating backup: ${error}`);
        } else {
            console.log(`Backup created at ${backupPath}`);
        }
    });
}

setInterval(backup, 3 * 60 * 1000); // 3 minutes
