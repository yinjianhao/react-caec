const production = {

  title: "Appbricks",

  staticUrl: "",

  languages: ['zh-cn', 'en'],

  // 描述后端是如何匹配URL，以及hbs模板
  routes: {
    '/*': {
      view: 'index',
      scripts: ['vendors', 'index'],
      csses:['vendors']
    }
  },
  isomorphic: false,
  // 描述前端有多少个entry
  entries: {
    'index': `./src/js/app/index.jsx`,
  }

}

module.exports = production
