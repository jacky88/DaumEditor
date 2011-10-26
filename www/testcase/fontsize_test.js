function assertFontsizeExecution(range, fontsize, expectedContent, expectedSelectedText) {
    range.select();
    assi.assertToolExecution("fontsize", fontsize, function() {
        htmlEqual(assi.getContent(), expectedContent);
        var selectedText = goog.dom.Range.createFromWindow(assi.win).getText();
        regexpEqual(selectedText, expectedSelectedText);
    });
}

module("fontsize");

test("fontsize queryCurrentStyle : 13.333px -> 10pt", function() {
    var p = ax.p(ax.span({id: "span", style: { fontSize: "13.333px" }}, "Hello World"));
    assi.setContentElement(p);
    var range = new goog.dom.Range.createFromNodes(assi.$('span').firstChild, 2, assi.$('span').firstChild, 2);
    range.select();

    equal(assi.getTool('fontsize').queryCurrentStyle(range), "10pt");
});

test("fontsize queryCurrentStyle : 3 -> 12t", function() {
    var p = ax.p(ax.font({id: "f", size: 3}, "Hello World"));
    assi.setContentElement(p);
    var range = new goog.dom.Range.createFromNodes(assi.$('f').firstChild, 2, assi.$('f').firstChild, 2);
    range.select();

    equal(assi.getTool('fontsize').queryCurrentStyle(range), "12pt");
});

!($tx.os_win && $tx.safari) && test("collapsed에서 fontsize를 9pt -> 12pt로 변경하기", function() {
    var p = ax.p(ax.span({id: "span"}, "Hello World"));
    assi.setContentElement(p);
    var range = new goog.dom.Range.createFromNodes(assi.$('span').firstChild, 2, assi.$('span').firstChild, 2);
    range.select();
    assertFontsizeExecution(range, "12pt", '<p><span id="span">He</span><span style="font-size: 12pt; "></span><span>llo World</span></p>', "");
});

test("selected에서 fontsize를 9pt -> 12pt로 변경하기", function() {
    var p = ax.p(ax.span({id: "span", style: { fontWeight: "bold" }}, "Hello World"));
    assi.setContentElement(p);
    var range = new goog.dom.Range.createFromNodes(assi.$('span').firstChild, 2, assi.$('span').firstChild, 3);
    range.select();
    assertFontsizeExecution(range, "12pt", '<p><span id="span" style="font-weight:bold">He</span><span style="font-size: 12pt; font-weight:bold">l</span><span style="font-weight:bold">lo World</span></p>', "l");
});