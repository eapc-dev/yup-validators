import { array, i18n, string } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof array['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    array.schema(string.schema(i18n.DEFAULT_INTL), i18n.DEFAULT_INTL, array.isRequired()),
    [[]],
    [undefined, null],
  ],
  [
    '!isRequired',
    array.schema(
      string.schema(i18n.DEFAULT_INTL),
      i18n.DEFAULT_INTL,
      array.isRequired({ active: false })
    ),
    [[], null, undefined],
    [],
  ],
  [
    'isEmail',
    array.schema(
      string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()),
      i18n.DEFAULT_INTL,
      array.isRequired({ active: false })
    ),
    [null, [], ['coucou@eapc.be']],
    [[null], [undefined], [''], ['coucou@']],
  ],
]

describe('Array validation', () => {
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
