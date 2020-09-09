import { asyncLoader } from '../util/loader'

export default {
  path: '/demo',
  component: asyncLoader('page/demo')
}
