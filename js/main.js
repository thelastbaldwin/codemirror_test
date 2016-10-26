window.addEventListener("load", function(){

    var delay;
    var HTMLEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
      mode: "text/html"
    });

    var CSSEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
        mode: "css"
    });

    var JSEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
        mode: "javascript"
    });

    function updatePreview() {
      var previewFrame = document.getElementById("preview");
      var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

      var newDocument = "<!doctype html>" +
      "<head><style>" + CSSEditor.getValue() + "</style>" +
      "</head>" +
      "<body>" + HTMLEditor.getValue() +
      "<script>" + JSEditor.getValue() +
      "</body>";


      preview.open();
      preview.write(newDocument);
      preview.close();
    }

    function update(){
      clearTimeout(delay);
      delay = setTimeout(updatePreview.call(window), 300);
    }

    HTMLEditor.on("change", function() {
      update();
    });

    CSSEditor.on("change", function() {
      update();
    });

    JSEditor.on("change", function() {
      update();
    });

    setTimeout(updatePreview, 300);
});