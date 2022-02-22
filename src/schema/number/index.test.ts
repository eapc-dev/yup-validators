import { i18n, number } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof number['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    number.schema(i18n.DEFAULT_INTL, number.isRequired()),
    [0, 1, -1, 0.000_01],
    [undefined, null, ''],
  ],
  [
    '!isRequired',
    number.schema(i18n.DEFAULT_INTL, number.isRequired({ active: false })),
    [0, 1, -1, 0.000_01, undefined],
    [null],
  ],
]

describe('Number validation', () => {
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
