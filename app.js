const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

const readMd = () => {
  fs.readFile('./README.md', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      convertHtml(data);
    }
  });
};
readMd();

const convertHtml = (data) => {
  const tokens = marked.lexer(data);
  const html = marked.parser(tokens);
  extractUrl(html);
};
const extractUrl = (html) => {
  linkArray = [];
  const dom = new JSDOM(html);
  const elements = dom.window.document.querySelectorAll('a');
  elements.forEach(links = (direction) => {
    const url = direction.href;
    const txtCont = direction.textContent;
    const linkObj = {
      href: url,
      text: txtCont,
      file: ''
    };
    linkArray.push(linkObj);
    validation(url, txtCont);
  });
  console.log(linkArray);
  states(linkArray);
};

const validation = (url, txtCont) => {
  fetch(url)
    .then(function(response) {
      console.log(response.url, response.statusText, response.status, txtCont);
    })
    .catch(function(err) {
      console.log('broken');
    });
};

const states = (linkArray) =>{
  console.log('Total :', linkArray.length);
};