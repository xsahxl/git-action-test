exports.handler = (event, context, callback) => {
  console.log('hello world =====ssss======s');

  callback(null, 'hello!' + process.cwd());
}

// const npa = require('npm-package-arg')

// function pickRegistry(spec, opts = {}) {
//   spec = npa(spec)
//   let registry = spec.scope && opts[spec.scope.replace(/^@?/, '@') + ':registry']

//   if (!registry && opts.scope) {
//     registry = opts[opts.scope.replace(/^@?/, '@') + ':registry']
//   }

//   if (!registry) {
//     registry = opts.registry || defaultOpts.registry
//   }


//   return registry
// }

// pickRegistry('@wssgryx/npm-test@1.0.5')