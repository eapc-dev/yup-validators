import { boolean, i18n } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof boolean['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired()),
    [1, 0, true, false],
    [undefined, null],
  ],
  [
    '!isRequired',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired({ active: false })),
    [1, 0, true, false, undefined],
    [null],
  ],
]

describe('Boolean validation', () => {
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
