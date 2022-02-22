import { date, i18n } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof date['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired()),
    [new Date(), '1998-01-14'],
    [undefined, null],
  ],
  [
    '!isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired({ active: false })),
    [new Date(), '1998-01-14', undefined],
    [null],
  ],
]

describe('Date validation', () => {
  for (const [name, schema, valid, invalid] of SCHEMAS) {
    // eslint-disable-next-line jest/valid-title
    it(name, () => {
      for (const value of valid) {
        expect(schema.isValidSync(value)).toBe(true)
      }

      for (const value of invalid) {
        expect(schema.isValidSync(value)).toBe(false)
      }
    })
  }
})
