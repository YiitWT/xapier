const axios = require("axios");
const kubitdb = require("kubitdb");
const notifier = require("node-notifier");
var db = new kubitdb(".version-xapier");
const yauzl = require("yauzl");
var kill = require("tree-kill");
var exec = require("child_process").exec;
const fs = require("fs");
const events = require('events');
const path = require("path");
const emitter = new events.EventEmitter();
module.exports = {
  Check: function (file, autodownload, runfile, pid) {
    var url = "https://api.github.com/repos/" +
    db.get("repo") +
    "/releases/latest"

    axios
    .get(url)
    .then((data) => {
      data = data.data;
    if(data.tag_name != db.get("version")){
      if (db.get("type") == "release") {
        emitter.emit("data","updatetime")
    kill(pid, "SIGKILL", function (err) {
            if (!data.assets) return;
            data.assets.map((x) => {
              if (x.name == file) {
                axios
                  .get(x.browser_download_url, { responseType: "stream" })
                  .then((response) => {
                    var stream = fs.createWriteStream(
                      path.join(__dirname, "../" + file)
                    );
                    response.data.pipe(stream);

                    response.data.on("end", () => {
                        console.log("sa")
                        notifier.notify({
                            title: "Update Finished!",
                            message: "Your app is up to date now! App is starting.",
                            icon: path.join(__dirname, "./src/update.png"), // Absolute path (doesn't work on balloons)
                            sound: true, // Only Notification Center or Windows Toasters
                            appID: "Xapier Updater", // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
                          });

                          emitter.emit("data","filedownloaded")
                      if (file.split(".zip").length == 2) {
                        yauzl.open(
                          path.join(__dirname, "../" + file),
                          { lazyEntries: true },
                          (err, zipfile) => {
                            if (err) return;
                            zipfile.readEntry();
                            zipfile.on("entry", (entry) => {
                              if (/\/$/.test(entry.fileName)) {
                                zipfile.readEntry();
                              } else {
                                const extractFilePath = path.join(
                                  "./",
                                  entry.fileName
                                );
                                fs.mkdirSync(path.dirname(extractFilePath), { recursive: true });
                                zipfile.openReadStream(
                                  entry,
                                  (err, readStream) => {
                                    if (err) return;
                                    readStream.pipe(
                                      fs.createWriteStream(extractFilePath)
                                    );
                                    readStream.on("end", () =>
                                      zipfile.readEntry()
                                    );
                                  }
                                );
                              }
                            });

                            zipfile.on("end", () => {
                                db.set("version",data.tag_name);
                              if (process.platform == "win32") {
                                exec(`start "" "${runfile}"`)
                              }else {
                                exec(`#!/bin/bash\n"${runfile}"`)
                              }
                              emitter.emit("data","unzipped")
                            });
                          }
                        );
                      }
                    });
                  });
              }
            });
        }) 
      } else {

        if (process.platform == "win32") {
            exec(`start "" "${url}"`)
          }else {
            exec(`#!/bin/bash\n"${url}"`)
          }
          db.set("version",data.tag_name);
        notifier.notify({
            title: "Old Version ERROR!",
            message: "Your app is not up to date. Please update your application.",
            icon: path.join(__dirname, "./src/update.png"), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            appID: "Xapier Updater", // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
          });

      }}
    });
  },

  Ignore: function () {
    return;
  },
  output: function (){
    return emitter
  }
};
