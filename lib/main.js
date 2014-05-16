var buttons = require('sdk/ui/button/action');
var clipboard = require("sdk/clipboard");
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var timers = require("sdk/timers");

var script = null;

var button = buttons.ActionButton({
  id: "pasting-button",
  label: "Enable auto paste",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: turnOn
});

function turnOn(state) {
  console.log("starting auto paste");
  button.removeListener("click", turnOn);
  button.on("click", turnOff);
  button.label = "Disable auto paste";
  script = pageMod.PageMod({
    include: "*",
    contentScriptFile: [data.url("my-script.js")],
	onAttach: startPasting
  });
}

function turnOff(state) {
  console.log("stopping auto paste");
  button.removeListener("click", turnOff);
  button.on("click", turnOn);
  button.label = "Enable auto paste";
  script.destroy();
}

function startPasting(worker) {
  worker.port.emit("clipData", clipboard.get());
  timers.setTimeout(startPasting, 500, worker);
}