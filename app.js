const fs = require('fs');
const marked = require('marked');

const readMd = () => {
    fs.readFile('./README.md', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            text = data;
            console.log(text);
            const tokens = marked.lexer(text);
            console.log(tokens);
        }
    })
}
readMd();