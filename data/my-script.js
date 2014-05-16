
self.port.on("clipData", printValue);

function printValue(data) {
  var boxes = document.getElementsByTagName("textarea");
  var box = null;
  if(boxes.length > 0) {
    box = boxes[0];
    box.contentEditable = true;
    box.isContentEditable = true;
    box.value = data;
  }
}