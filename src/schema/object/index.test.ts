import * as yup from 'yup'

import { i18n, object, string } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof object['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    object.schema({}, i18n.DEFAULT_INTL, object.isRequired()),
    [{}, { a: 1 }],
    [null, undefined],
  ],
  [
    '1 field',
    object.schema(
      {
        email: string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()),
      },
      i18n.DEFAULT_INTL,
      object.isRequired()
    ),
    [{ email: 'coucou@eapc.be' }],
    [{}],
  ],
  [
    '2 fields with ref (isWhitelisted)',
    object.schema(
      {
        whitelist: string.schema(i18n.DEFAULT_INTL, string.isRequired()),
        value: string.schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isWhitelisted({
            chars: yup.ref('whitelist'),
          })
        ),
      },
      i18n.DEFAULT_INTL,
      object.isRequired()
    ),
    [
      {
        whitelist: 'abc',
        value: 'abc',
      },
      {
        whitelist: 'abc',
        value: 'ac',
      },
    ],
    [
      {
        whitelist: 'abc',
        value: 'd',
      },
    ],
  ],
  [
    '2 fields with ref (isEqualTo)',
    object.schema(
      {
        whitelist: string.schema(i18n.DEFAULT_INTL, string.isRequired()),
        value: string.schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isEqualTo({
            values: yup.ref('whitelist'),
          })
        ),
      },
      i18n.DEFAULT_INTL,
      object.isRequired()
    ),
    [
      {
        whitelist: 'abc',
        value: 'abc',
      },
    ],
    [
      {
        whitelist: 'abc',
        value: 'abcd',
      },
    ],
  ],
]

describe('Object validation', () => {
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
