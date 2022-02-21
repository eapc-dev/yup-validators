import * as yup from 'yup'

import { i18n, object, string } from '../../index'

describe('Object validation', () => {
  it('isRequired', () => {
    expect(object.schema({}, i18n.DEFAULT_INTL, object.isRequired()).isValidSync({})).toBe(true)

    expect(object.schema({}, i18n.DEFAULT_INTL, object.isRequired()).isValidSync(null)).toBe(false)
  })

  it('1 field', () => {
    expect(
      object
        .schema(
          {
            email: string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()),
          },
          i18n.DEFAULT_INTL,
          object.isRequired()
        )
        .isValidSync({
          email: 'coucou@eapc.be',
        })
    ).toBe(true)

    expect(
      object
        .schema(
          {
            email: string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()),
          },
          i18n.DEFAULT_INTL,
          object.isRequired()
        )
        .isValidSync({})
    ).toBe(false)
  })

  it('2 fields with ref', () => {
    expect(
      object
        .schema(
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
        )
        .isValidSync({
          whitelist: 'abc',
          value: 'abc',
        })
    ).toBe(true)

    expect(
      object
        .schema(
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
        )
        .isValidSync({
          whitelist: 'abc',
          value: 'abcd',
        })
    ).toBe(false)
  })
})
