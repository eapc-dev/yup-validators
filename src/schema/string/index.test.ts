import { i18n, string } from '../../index'

describe('String validation', () => {
  it('isRequired', () => {
    expect(string.schema(i18n.DEFAULT_INTL, string.isRequired()).isValidSync('Coucou')).toBe(true)

    expect(
      string.schema(i18n.DEFAULT_INTL, string.isRequired({ active: false })).isValidSync('Coucou')
    ).toBe(true)

    expect(string.schema(i18n.DEFAULT_INTL, string.isRequired()).isValidSync(undefined)).toBe(false)

    expect(
      string.schema(i18n.DEFAULT_INTL, string.isRequired({ active: false })).isValidSync(undefined)
    ).toBe(true)
  })

  it('isLength', () => {
    expect(
      string
        .schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 6,
            max: 12,
          })
        )
        .isValidSync('123456')
    ).toBe(true)

    expect(
      string
        .schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 6,
            max: 12,
          })
        )
        .isValidSync('12345')
    ).toBe(false)

    expect(
      string
        .schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 6,
            minIncluded: false,
            max: 12,
          })
        )
        .isValidSync('123456')
    ).toBe(false)

    expect(
      string
        .schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 6,
            minIncluded: false,
            max: 12,
          })
        )
        .isValidSync('1234567')
    ).toBe(true)

    expect(
      string
        .schema(
          i18n.DEFAULT_INTL,
          string.isRequired(),
          string.isLength({
            min: 6,
            minDelta: 1,
            max: 12,
          })
        )
        .isValidSync('1234567')
    ).toBe(true)
  })

  it('isAlphanumeric', () => {
    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isAlphanumeric())
        .isValidSync('abc123')
    ).toBe(true)

    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isAlphanumeric())
        .isValidSync('abc123!')
    ).toBe(false)
  })

  it('isEmail', () => {
    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail())
        .isValidSync('coucou@eapc.be')
    ).toBe(true)

    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail())
        .isValidSync('COUCOU@TEST.EAPC.BE')
    ).toBe(true)

    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail())
        .isValidSync('coucou@eapc.b')
    ).toBe(false)

    expect(
      string
        .schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail())
        .isValidSync('coucou@eapc')
    ).toBe(false)

    expect(
      string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()).isValidSync('coucou')
    ).toBe(false)

    expect(
      string.schema(i18n.DEFAULT_INTL, string.isRequired(), string.isEmail()).isValidSync('coucou')
    ).toBe(false)
  })
})
