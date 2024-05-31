const fs = require('fs');
const path = require('path');

const readdir = (dir, _dirname, files, type) => {
  const list = fs.readdirSync(dir);
  list.sort(file => {
    // /a a/b /b /c 路由循序
    if (/.vue$/.test(file.toLowerCase())) return -1;
    return 1;
  }).forEach(file => {
    const _file = path.join(dir, file);
    const stat = fs.statSync(_file);
    if (!stat) return;
    if (!stat.isDirectory()) {
      // 过滤掉非.vue文件 and 非components目录下的文件
      if (/.vue$/.test(file.toLowerCase()) && dir.indexOf('components') < 0) {
        const pathName = dir.replace(_dirname, '').replace(/\\/g, '/').replace(/_/g, ':') || '/'
        if (type === 'h5') files.push({ pathName })
        else files.push(pathName)
      }
    } else {
      readdir(_file, _dirname, files, type);
    }
  });
}

const getFiles = (dir, type) => {
  const files = [];
  const _dirname = dir;
  readdir(dir, _dirname, files, type);
  return files;
}

module.exports = {
  getFiles
}
