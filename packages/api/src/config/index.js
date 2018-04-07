let gc_json_key_file = null
try {
  gc_json_key_file = JSON.parse(process.env.GC_JSON_KEY_FILE)
} catch (err) {}

export const GC_JSON_KEY_FILE = gc_json_key_file

export const PORT = process.env.PORT || 8084

export const ENV = process.env.ENV || 'dev'

export const STORE_ORIGIN = process.env.STORE_ORIGIN
