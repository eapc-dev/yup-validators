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
    [1, 0, true, false, undefined, null],
    [],
  ],
  [
    '!isRequired',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired({ active: false })),
    [1, 0, true, false, undefined, null],
    [],
  ],
  [
    'isTrue',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired(), boolean.isTrue()),
    [1, true],
    [0, false, undefined, null],
  ],
  [
    'isFalse',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired(), boolean.isFalse()),
    [0, false, undefined, null],
    [1, true],
  ],
  [
    'isEqualTo',
    boolean.schema(
      i18n.DEFAULT_INTL,
      boolean.isRequired(),
      boolean.isEqualTo({
        values: [false],
      })
    ),
    [0, false, undefined, null],
    [1, true],
  ],
  [
    'isDifferentThan',
    boolean.schema(
      i18n.DEFAULT_INTL,
      boolean.isRequired(),
      boolean.isDifferentThan({
        values: [false],
      })
    ),
    [1, true],
    [0, false, undefined, null],
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
