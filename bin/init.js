let co = require("co");
let prompt = require("co-prompt");
var fs = require("fs");
var path = require("path");
const exec = require("child_process").execSync;
const spawn = require("child_process").spawnSync;
const gpackbags = ["webpack", "vue-cli", "@angular/cli"];
const jqbags = ["webpack","copy-webpack-plugin", "bootstrap", "jquery", "css-loader", "style-loader","eslint",
"babel"," @babel/core","bable-loader","babel-plugin-transform-runtime","babel-preset-es2015", "babel-runtime",
"clean-webpack-plugin","copy-webpack-plugin","html-loader","html-webpack-plugin",
"extract-text-webpack-plugin","file-loader","glob","imports-loader","less","less-loader","url-loader","webpack-dev-server"
];
const vuebags = [];
const ngbags = [];
module.exports = function(name) {
  co(generator(name));
};

let generator = function*(name) {
  if (!name) {
    console.log("    ----------------------------------------");
    name = yield prompt("    请选择模板类型(jq\vue\ng):");
    console.log("    ----------------------------------------");
  }
  if (gpackbags.length > 0) {
    console.log("    ----------------------------------------");
    console.log("安装全局环境");
    var gpack = [];
    gpack.push("install");
    for (let i = 0; i < gpackbags.length; i++) {
      gpack.push(gpackbags[i]);
    }
    gpack.push("-g");
    let gnpmcmd = process.platform === "win32" ? "npm.cmd" : npm;
    var gopt = {
      cwd: process.cwd(),
      stdio: ["inherit", "inherit", "inherit"]
    };
    spawn(gnpmcmd, gpack, gopt);
    console.log("    全局环境安装完成");
    console.log("    ----------------------------------------");
  }
  console.log("    ----------------------------------------");
  let projectName = yield prompt("    请输入项目名称(Sample):");
  if (!projectName) {
    projectName = "Sample";
  }
  console.log("    ----------------------------------------");
  if (name == "jq") {
    startJQ(projectName);
    console.log("    ----------------------------------------");
    console.log("    项目可以使用");
    console.log("    ----------------------------------------");
  } else if (name == "vue") {
    startvue(projectName);
    console.log("    ----------------------------------------");
    console.log("    项目可以使用");
    console.log("    ----------------------------------------");
  } else if (name == "ng") {
    startng(projectName); 
    console.log("    ----------------------------------------");
    console.log("    项目可以使用");
    console.log("    ----------------------------------------");
  } else {
    console.log("不支持的项目类型");
  }
};
function startJQ(projectName) {
  fs.exists("./" + projectName, function(exists) {
    if (!exists) {
      fs.mkdir("./" + projectName, function(err) {
        if (err) {
          console.error(err);
          process.exit();
          return;
        }
        fs.mkdir("./" + projectName+"/src", function(err) {});
        fs.mkdir("./" + projectName+"/static", function(err) {});
        console.log("    创建好" + projectName + "的目录");
        console.log("    ----------------------------------------");
        let npmcmd = process.platform === "win32" ? "npm.cmd" : npm;
        var opt = {
          cwd: path.join(process.cwd(), projectName),
          stdio: ["inherit", "inherit", "inherit"]
        };
        console.log("    ----------------------------------------");
        exec(npmcmd + " init", opt, function(err) {
          if (err) {
            console.error(err);
            return;
          }
        });
        console.log("    初始化项目完成");
        console.log("    ----------------------------------------");
        if (jqbags.length > 0) {
          console.log("    ----------------------------------------");
          console.log("    添加项目引用");
          var lpack = [];
          lpack.push("install");
          for (let i = 0; i < jqbags.length; i++) {
            lpack.push(jqbags[i]);
          }
          lpack.push("--save-dev");
          spawn(npmcmd, lpack, opt);
          console.log("    添加项目引用完成");
          console.log("    ----------------------------------------");
        } 
      });
    } else {
      console.log("    目录已存在，项目不会创建");
      process.exit();
    }
  });

  //process.exit();
}

function startvue(projectName) {
  fs.exists("./" + projectName, function(exists) {
    if (!exists) {
      fs.mkdir("./" + projectName, function(err) {
        if (err) {
          console.error(err);
          process.exit();
          return;
        }
        console.log("    创建好" + projectName + "的目录");
        console.log("    ----------------------------------------");
        let npmcmd = process.platform === "win32" ? "vue.cmd" : "vue";
        var opt = {
          cwd: path.join(process.cwd(), projectName),
          stdio: ["inherit", "inherit", "inherit"]
        };
        console.log("    ----------------------------------------");
        exec(npmcmd + " init webpack " + projectName, opt, function(err) {
          if (err) {
            console.error(err);
            return;
          }
        });
        console.log("    初始化项目完成");
        console.log("    ----------------------------------------");
        if (vuebags.length > 0) {
          console.log("    ----------------------------------------");
          console.log("    添加项目引用");
          var lpack = [];
          lpack.push("install");
          for (let i = 0; i < vuebags.length; i++) {
            lpack.push(vuebags[i]);
          }
          lpack.push("--save-dev");
          spawn(npmcmd, lpack, opt);
          console.log("添加项目引用完成");
          console.log("    ----------------------------------------");
        }
      });
    } else {
      console.log("    目录已存在，项目不会创建");
      process.exit();
    }
  });

  //process.exit();
}

function startng(projectName) {
  fs.exists("./" + projectName, function(exists) {
    if (!exists) {
      fs.mkdir("./" + projectName, function(err) {
        if (err) {
          console.error(err);
          process.exit();
          return;
        }
        console.log("    创建好" + projectName + "的目录");
        console.log("    ----------------------------------------");
        let npmcmd = process.platform === "win32" ? "ng.cmd" : "ng";
        var opt = {
          cwd: path.join(process.cwd(), projectName),
          stdio: ["inherit", "inherit", "inherit"]
        };
        console.log("    ----------------------------------------");
        exec(npmcmd + " new " + projectName, opt, function(err) {
          if (err) {
            console.error(err);
            return;
          }
        });
        console.log("    初始化项目完成");
        console.log("    ----------------------------------------");
        if (ngbags.length > 0) {
          console.log("    ----------------------------------------");
          console.log("    添加项目引用");
          var lpack = [];
          lpack.push("install");
          for (let i = 0; i < ngbags.length; i++) {
            lpack.push(ngbags[i]);
          }
          lpack.push("--save-dev");
          spawn(npmcmd, lpack, opt);
          console.log("    添加项目引用完成");
          console.log("    ----------------------------------------");
        }
      });
    } else {
      console.log("    目录已存在，项目不会创建");
      process.exit();
    }
  });

  //process.exit();
}
