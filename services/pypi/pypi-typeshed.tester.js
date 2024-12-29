import { createServiceTester } from '../tester.js'
export const t = await createServiceTester()

t.create('typeshed (yes)')
  .get('/peewee.json')
  .expectBadge({ label: 'typeshed', message: 'types-peewee' })

t.create('typeshed (no)')
  .get('/not-a-package.json')
  .expectBadge({ label: 'typeshed', message: 'no' })
