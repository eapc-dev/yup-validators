import {
  DEFAULT_INTL,
  isStringAlphanumeric,
  isStringEmail,
  isStringRequired,
  stringSchema,
} from '../../index'

describe('String validation', () => {
  it('isRequired', () => {
    expect(stringSchema(DEFAULT_INTL, isStringRequired()).isValidSync('Coucou')).toBe(true)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired({ active: false })).isValidSync('Coucou')
    ).toBe(true)

    expect(stringSchema(DEFAULT_INTL, isStringRequired()).isValidSync(undefined)).toBe(false)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired({ active: false })).isValidSync(undefined)
    ).toBe(true)
  })

  it('isAlphanumeric', () => {
    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringAlphanumeric()).isValidSync('abc123')
    ).toBe(true)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringAlphanumeric()).isValidSync('abc123!')
    ).toBe(false)
  })

  it('isEmail', () => {
    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou@eapc.be')
    ).toBe(true)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync(
        'COUCOU@TEST.EAPC.BE'
      )
    ).toBe(true)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou@eapc.b')
    ).toBe(false)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou@eapc')
    ).toBe(false)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou')
    ).toBe(false)

    expect(
      stringSchema(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou')
    ).toBe(false)
  })
})
