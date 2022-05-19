import { i18n, string } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof string['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    string.schema(i18n.DEFAULT_INTL, string.isRequired()),
    ['Coucou', 'ç', 'ça va'],
    [undefined, null, ''],
  ],
  [
    '!isRequired',
    string.schema(i18n.DEFAULT_INTL, string.isRequired({ active: false })),
    ['Coucou', 'ç', 'ça va', '', null, undefined],
    [],
  ],
  [
    'isLength',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isLength({
        min: 6,
        max: 12,
      })
    ),
    ['123456', '123456789012'],
    ['12345', '1234567890123'],
  ],
  [
    'isLength (min & max not included)',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isLength({
        min: 6,
        minIncluded: false,
        max: 12,
        maxIncluded: false,
      })
    ),
    ['1234567', 'abcdefghijk'],
    ['123456', 'abcdefghijkl'],
  ],
  [
    'isLength (min & max delta)',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isLength({
        min: 6,
        minDelta: -1,
        max: 12,
        maxDelta: 1,
      })
    ),
    ['12345', '1234567890123'],
    ['1234', '12345678901234'],
  ],
  [
    'isEqualTo',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isEqualTo({
        values: ['12', '14'],
      })
    ),
    ['12', '14'],
    ['13', ''],
  ],
  [
    'isDifferentThan',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isDifferentThan({
        values: ['12', '14'],
      })
    ),
    ['13'],
    ['12', '14', ''],
  ],
  [
    'doesContain',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.doesContain({
        values: ['12', '14', /[A-z]{2}$/],
      })
    ),
    ['12', '14', '122', '_1412', 'ab'],
    ['13', ''],
  ],
  [
    'doesContain (matchAll)',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.doesContain({
        values: ['12', '14', /[A-z]{2}$/],
        matchAll: true,
      })
    ),
    ['1412ba', '1214___ab'],
    ['12', '14'],
  ],
  [
    'doesNotContain',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.doesNotContain({
        values: ['12', '14'],
      })
    ),
    ['13', '15'],
    ['12', '14', '122', '_1412'],
  ],
  [
    'doesNotContain (do not matchAll)',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.doesNotContain({
        values: ['12', '14', /[A-z]{2}$/],
        matchAll: false,
      })
    ),
    ['12', '14', '13', 'ab'],
    ['1412ba', '1214___ab'],
  ],
  [
    'isAlphanumeric',
    string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isAlphanumeric()),
    ['13', 'abc123'],
    ['&', 'abc123)', 'é'],
  ],
  [
    'isEmail',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isEmail(),
      string.normalizeEmail()
    ),
    ['coucou@eapc.be', 'coucou+jordan@eapc.be'],
    ['coucou@', 'coucou@eapc.b', 'coucou+jordan))@eapc.be'],
  ],
  [
    'isPaymentReference',
    string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isPaymentReference()),
    ['+++723/4871/44251+++'],
    ['+++723/4871/44252+++', 'coucou@eapc.b', 'coucou+jordan))@eapc.be'],
  ],
  [
    'isPaymentReference(optional)',
    string.schema(
      i18n.DEFAULT_INTL,
      string.isRequired(),
      string.isPaymentReference({ optional: true })
    ),
    ['+++723/4871/44251+++', '+++723/4871/44251++', 'coucou@eapc.b', 'coucou+jordan))@eapc.be'],
    ['+++723/4871/44252+++'],
  ],
]

describe('String validation', () => {
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
