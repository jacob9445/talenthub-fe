var fp = require('../../node_modules/lodash/fp')

const convertQueryString2JSON = (URL) => fp.compose(
  fp.reduce((acc, item) => ({
    ...acc,
    [item[0]]: item[1]
  }), {}),
  fp.map(fp.split('=')),
  fp.split('&'),
  fp.replace('?','')
)(URL)

const convertJSON2QueryString = (Json) => {
  
}

console.log(
  convertQueryString2JSON('?user=neymar&age=22&gender=M')
)

console.log(
  convertJSON2QueryString({
    user: 'neymar',
    age: 22,
    gender: 'M'
  })
)