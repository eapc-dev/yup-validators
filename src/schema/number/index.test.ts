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
    [0, 1, -1, 0.000_01, '1'],
    [undefined, null, ''],
  ],
  [
    '!isRequired',
    number.schema(i18n.DEFAULT_INTL, number.isRequired({ active: false })),
    [0, 1, -1, 0.000_01, '1', null, undefined],
    [{}, 'a'],
  ],
  [
    'isMinMax',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isMinMax({ min: 5, max: 7 })),
    [5, 6, 7, 5.000_000_1],
    [4, 8, null],
  ],
  [
    'isMinMax (delta)',
    number.schema(
      i18n.DEFAULT_INTL,
      number.isRequired(),
      number.isMinMax({ min: 5, minDelta: -1, max: 7, maxDelta: 1 })
    ),
    [4, 5, 6, 7, 5.000_000_1, 8],
    [-1, 3, null, 9],
  ],
  [
    'isMinMax (not included)',
    number.schema(
      i18n.DEFAULT_INTL,
      number.isRequired(),
      number.isMinMax({
        min: 5,
        minDelta: -1,
        minIncluded: false,
        max: 7,
        maxDelta: 1,
        maxIncluded: false,
      })
    ),
    [4.000_001, 5, 6, 7, 5.000_000_1, 7.999_999],
    [-1, 3, 4, null, 8, 9],
  ],
  [
    'isDifferentThan',
    number.schema(
      i18n.DEFAULT_INTL,
      number.isRequired(),
      number.isDifferentThan({ values: [0, 1] })
    ),
    [-1, 0.000_01],
    [undefined, null, 0, 1, ''],
  ],
  [
    'isEqualTo',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isEqualTo({ values: [0, 1] })),
    [0, 1],
    [undefined, null, -1, 0.000_01, ''],
  ],
  [
    'isPositive',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isPositive()),
    [1],
    [undefined, null, -1, 0],
  ],
  [
    'isNegative',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isNegative()),
    [-1],
    [undefined, null, 1, 0],
  ],
  [
    'isMod',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isMod({ values: [10, 20] })),
    [0, 10, 20, 5_565_450],
    [undefined, null, 1, 5, 25, 10.000_000_000_001],
  ],
  [
    'isMod (matchAll)',
    number.schema(
      i18n.DEFAULT_INTL,
      number.isRequired(),
      number.isMod({ values: [10, 20], matchAll: true })
    ),
    [0, 20, 5_565_460],
    [undefined, null, 1, 5, 25, 10.000_000_000_001],
  ],
  [
    'isInteger',
    number.schema(i18n.DEFAULT_INTL, number.isRequired(), number.isInteger()),
    [0, 10, 20, 5_565_450, -2],
    [undefined, null, 0.1, 10.000_000_000_001],
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
