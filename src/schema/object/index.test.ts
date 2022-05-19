import * as yup from 'yup'

import { array, i18n, number, object, string } from '../../index'

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
    '!isRequired',
    object.schema({}, i18n.DEFAULT_INTL, object.isRequired({ active: false })),
    [{}, { a: 1 }, null, undefined],
    [],
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
            values: [yup.ref('whitelist')],
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
  [
    'password',
    object.schema(
      {
        password: string.schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 8,
            max: 16,
            message: 'e.form.password_length',
          }),
          string.doesContain({
            values: /\d/,
            message: 'e.form.password_must_contain_number',
          }),
          string.doesContain({
            values: /[a-z]/,
            message: 'e.form.password_must_contain_lowercased_character',
          }),
          string.doesContain({
            values: /[A-Z]/,
            message: 'e.form.password_must_contain_uppercased_character',
          })
        ),
        confirmPassword: yup.mixed().when('password', {
          is: (value?: string) => value && value.length > 0,
          then: string.schema(
            i18n.DEFAULT_INTL,
            string.isRequired(),
            string.isEqualTo({ values: [yup.ref('password')], message: 'e.form.confirm_password' })
          ),
          otherwise: string.schema(
            i18n.DEFAULT_INTL,
            string.isRequired(),
            string.isLength({
              min: 8,
              max: 16,
              message: 'e.form.password_length',
            }),
            string.doesContain({
              values: /\d/,
              message: 'e.form.password_must_contain_number',
            }),
            string.doesContain({
              values: /[a-z]/,
              message: 'e.form.password_must_contain_lowercased_character',
            }),
            string.doesContain({
              values: /[A-Z]/,
              message: 'e.form.password_must_contain_uppercased_character',
            })
          ),
        }),
      },
      i18n.DEFAULT_INTL,
      object.isRequired()
    ),
    [
      {
        password: 'Test1234',
        confirmPassword: 'Test1234',
      },
    ],
    [
      {
        password: 'Test1234',
        confirmPassword: 'Test1234!',
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

  it('default to null', () => {
    expect(
      object
        .schema(
          {
            digitalFile: object.schema(
              {
                id: number.schema(i18n.DEFAULT_INTL, number.isRequired()),
              },
              i18n.DEFAULT_INTL
            ),
            test: number.schema(i18n.DEFAULT_INTL),
            testArr: array.schema(number.schema(i18n.DEFAULT_INTL), i18n.DEFAULT_INTL),
          },
          i18n.DEFAULT_INTL,
          object.isRequired()
        )
        .cast({
          digitalFile: undefined,
          testArr: null,
        })
    ).toStrictEqual({
      digitalFile: null,
      test: null,
      testArr: [],
    })
  })
})
