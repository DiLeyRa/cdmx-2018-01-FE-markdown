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
    linkArray = [];
    const dom = new JSDOM(html);
    const etiqueta = dom.window.document.querySelectorAll("a"); 
    etiqueta.forEach(links = (a) => {
        let urll = a.href;
        let txtCont = a.textContent;
        let linkObj = {
            href: a.href,
            text: a.textContent,
            file: ''
        };
        linkArray.push(linkObj);
        validation(urll, txtCont);
    });
    console.log(linkArray);
    states(linkArray);
}

const validation = (urll, txtCont) => {
    // console.log(urll);
    fetch(urll)
    .then(function(response) {
        console.log(response.url, response.statusText, response.status, txtCont);
    })
    .catch(function(err) {
        console.error(err);
    });
}

const states = (linkArray) =>{
    console.log('Total :', linkArray.length);
    let uniqs = linkArray.filter(function (item,index,array){
        return array.indexOf(item) === index;
    })
    console.log('Uniqs :',uniqs.length)
}