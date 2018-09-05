const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const array = [];
const fetch = require('node-fetch');

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
    const etiqueta = dom.window.document.querySelectorAll("a"); 
    etiqueta.forEach(links = (a) => {
        let urll = a.href;
        let txtCont = a.textContent;
        validation(urll, txtCont);
    });
}

const validation = (urll, txtCont) => {
    // console.log(urll);
    linkArray = [];
    fetch(urll)
    .then(function(response) {
        let linkObj = {
            URL: response.url,
            StatusText: response.statusText,
            Status: response.status,
            Text: txtCont
        };
        linkArray.push(linkObj);
        console.log(linkArray.length);
    })
    .catch(function(err) {
        console.error(err);
    });
}
