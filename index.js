const { URL } = require('url')

const a = (url) => {
  const parsed = new URL(url)
  console.log('parsed:: ', parsed);
  const from = `${parsed.protocol}//${parsed.host}${parsed.pathname}`
  const rel = new URL('.', from)
  console.log('rel: ', rel);
  const res = `//${rel.host}${rel.pathname}`
  console.log('res: ', res);
  return res
}

// console.log(a('https://registry.npmjs.org/:_auth=xxxxxx'));
