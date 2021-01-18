const fs = require('fs');

function createConfig(id, name, channel) {
    var list = {
        "server_name" : name,
        "muted_role" : "none",
        "audit_log" : "disabled",
        "prefix" : "n!",
        "premium" : "false"};
    var json = JSON.stringify(list, null, "\t");
    fs.writeFile("./serverdata/" + id + ".json", json, function(err) {
        if(err) {
            console.log(err);
        } else {
            channel.send("Created a config!");
        }
    }); 
}

function changeValue(id, attribute, newValue) {
    fs.readFile("./serverdata/" + id + ".json", 'utf8', (err,data) => {
        if (err) {
          return console.log(err);
        }
        var list = JSON.parse(data);
        list[attribute] = newValue;
        var json = JSON.stringify(list, null, "\t");
        fs.writeFile("./serverdata/" + id + ".json", json, function(err) {
            if(err) {
                console.log(err);
            }
        }); 
    });
}

function getValue(id, attribute, callback) {
  fs.readFile("./serverdata/" + id + ".json", 'utf8', (err,data) => {
        if (err) {
          return console.log(err);
        }
        var list = JSON.parse(data);
        callback(list[attribute]);
    });
}

module.exports = {
    createConfig: createConfig,
    changeValue: changeValue,
    getValue: getValue
};