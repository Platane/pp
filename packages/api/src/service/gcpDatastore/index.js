import connectDataStore from '@google-cloud/datastore'
import { GC_JSON_KEY_FILE, ENV } from '~/config'

export const connect = () =>
  connectDataStore({
    projectId: GC_JSON_KEY_FILE.project_id,
    credentials: GC_JSON_KEY_FILE,
    namespace: ENV,
  })
