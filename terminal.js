#!/usr/bin/env node
const axios = require("axios");
const kubitdb = require("kubitdb");
var db = new kubitdb(".version-xapier")
var args = process.argv.slice(2);

if(args[0] == "-c" && args[1]){
    if(args[1].replaceAll("https://","").startsWith("github.com")) {
     if(args.filter(z=>z == "-r").length) db.set("type","release"); else db.del("type");
     if(args.filter(z=>z == "-a").length) db.set("autoupdate",true); else db.del("autoupdate");
     db.set("repo", args[1].replaceAll("/main","").replaceAll("/tree","").replaceAll("https://","").replaceAll("github.com/","")); 
     db.set("version", "1.0.0"); 
     console.log("Repo saved successfully.");
    }
    else return console.log("You should enter a valid github repo like: github.com/YiitWT/xapier");
}
else if(args[0] == "-u" && args[1]){
    if(!args[1]) throw new Error("You should enter a version like: 0.0.3");
    else { 
        db.set("version", args[1]); 
        console.log("Repo saved successfully.");
    };
};  


