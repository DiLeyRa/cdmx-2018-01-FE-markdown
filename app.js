const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const readMd = () => {
    fs.readFile('./README.md', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            convertHtml(data);
        }
    })
}
readMd();

const convertHtml = (data) => {
    const tokens = marked.lexer(data);
    //console.log(tokens);
    const html = marked.parser(tokens);
    //console.log(html);
    extractUrl(html);

}
const extractUrl = (html) => {
    const dom = new JSDOM(html);
    dom.window.document.querySelectorAll("a").forEach(a => console.log(a.href));
}