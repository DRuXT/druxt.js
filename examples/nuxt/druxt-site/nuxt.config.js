const baseUrl = process.env.BASE_URL || 'https://demo-api.druxtjs.org'
export default {
  target: 'static',
  generate: { routes: ['/'] },
  telemetry: true,
  modules: ['druxt-site'],
  druxt: { baseUrl },
  proxy: [baseUrl + '/sites/default/files']
}
