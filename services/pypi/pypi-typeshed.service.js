import PypiBase, { pypiGeneralParams } from './pypi-base.js'

export default class PypiTypeshed extends PypiBase {
  static category = 'platform-support'

  static route = this.buildRoute('pypi/typeshed')

  static openApi = {
    '/pypi/typeshed/{packageName}': {
      get: {
        summary: 'PyPI - Typeshed',
        description: 'Whether the typeshed project (https://github.com/python/typeshed) provides type stubs for this package',
        parameters: pypiGeneralParams,
      },
    },
  }

  static defaultBadgeData = { label: 'Typeshed' }

  static render({ egg, hasTypeshed }) {
    if (hasTypeshed) {
      return {
        message: 'types-' + egg,
        color: 'brightgreen',
      }
    } else {
      return {
        message: 'no',
        color: 'red',
      }
    }
  }

  async handle({ egg }, { pypiBaseUrl }) {
    // Typeshed's stubs are distributed on Pypi as projects with the types-* prefix
    // See https://typing.readthedocs.io/en/latest/spec/distributing.html#stub-only-packages
    const hasTypeshed = this.fetch({ egg: 'types-' + egg, pypiBaseUrl })
    .then(() => true)
    .catch(() => false);
    return this.constructor.render({ hasTypeshed })
  }
}
