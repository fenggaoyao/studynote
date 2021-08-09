import { parseHTML } from "../src/parser";
let assert = require("assert");

it("parse a single element", function () {
  let doc = parseHTML("<div></div>");
  let div = doc.children[0];

  assert.equal(div.tagName, "div");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 2);
});

it("parse a single element with text content", function () {
  let doc = parseHTML("<div>hello</div>");
  let text = doc.children[0].children[0];

  assert.equal(text.content, "hello");
  assert.equal(text.type, "text");
});
it("tag mismatch", function () {
  try {
    parseHTML("<div></vid>");
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!");
  }
});

it("test with <", function () {
  let doc = parseHTML("<div>a < b</div>");
  let text = doc.children[0].children[0];
  assert.equal(text.content, "a < b");
  assert.equal(text.type, "text");
});

it("with property", function () {
  let doc = parseHTML(`<div id=a class='cls' data="abc" ></div>`);
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }

  assert.ok(count === 3);
});

it("with property2", function () {
  let doc = parseHTML(`<div id=a class='cls' data="abc"></div>`);
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }

  assert.ok(count === 3);
});

it("with property 3", function () {
  // 增加一个属性在引号结束之后，直接跟随属性名的Case，修复afterQuotedAttributeValue的问题
  let doc = parseHTML('<div id=a class="cls"data="abc"/>');
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }

  assert.ok(count === 3);
});

it("script", function () {
  let content = `
    <div>abcd</div>
  <span>x</span>
  /script
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script 
  `;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];

  assert.equal(text.content, content);
  assert.equal(text.type, "text");
});

it("attribute with no value", function () {
  let doc = parseHTML("<div class />");
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "");
    }
  }

  assert.ok(count === 1);
});

it("attribute with no value2", function () {
  let doc = parseHTML("<div class id data = />");
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "");
    }
  }

  assert.ok(count === 3);
});

it("attribute with no value3", function () {
  let doc = parseHTML("<div id = ></div>");
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "");
    }
  }

  assert.ok(count === 1);
});

it("self closed single element", function () {
  let doc = parseHTML("<div/>");
  let div = doc.children[0];

  assert.equal(div.tagName, "div");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 3);
});

it("uppercase tagname element", function () {
  let doc = parseHTML("<DIV/>");
  let div = doc.children[0];

  assert.equal(div.tagName, "DIV");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 3);
});

it("multiple spaces single element", function () {
  let doc = parseHTML("<div     />");
  let div = doc.children[0];

  assert.equal(div.tagName, "div");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 3);
});

it("empty tagname element", function () {
  let doc = parseHTML("</>");
  let div = doc.children[0];

  assert.equal(div.tagName, "");
  assert.equal(div.children.length, 0);
  assert.equal(div.type, "element");
  assert.equal(div.attributes.length, 3);
});
