// Inspired by how logstash environment variables work. They are automatically
// mapped from the config to a namespaced environment variable using a dot
// notation.

// I can override anything in the default object, simply by doing the following:
// dadjokes.db.url: 'mongodb://server1:1001,server2:1002'
// dadjokes.db.options.replset.rs_name: 'my_replicas'
// dadjokes.db.options.server.poolSize: 2

const set = require('lodash.set')
const get = require('lodash.get')
const cloneDeep = require('lodash.clonedeep')

const defaultConfig = {
  app: {
    port: 8066
  },
  health: {
    port: 8067
  },
  db: {
    name: 'jokemongo',
    host: 'localhost',
    user: 'root',
    password: 'foobar',
    options: {
      useNewUrlParser: true
    }
  }
}

class Config {
  constructor(prefix, defaults) {
    this._config = this._mergeVariables(prefix, defaults)
  }

  _castValue(envKey, configKey) {
    const original = get(this._config, configKey)
    const newValue = process.env[envKey]
    switch (typeof original) {
      case 'number':
        if (isNaN(newValue)) {
          throw new Error('Invalid environment variable')
        }
        return Number(newValue)
      case 'boolean':
        return Boolean(newValue)
      default:
        return newValue
    }
  }

  _mergeVariables(prefix, defaults) {
    const merged = cloneDeep(defaults)

    for (const key in process.env) {
      if (key.startsWith(prefix + '.')) {
        const setKey = key.substring(prefix.length + 1)
        const value = process.env[key]
        set(merged, setKey, value)
      }
    }

    return merged
  }

  get(path) {
    return get(this._config, path)
  }
}

const config = new Config('jokemongo', defaultConfig)

module.exports = config
