import { DEFAULT_INTL } from '../../i18n/placeholder'

import { STRING_SCHEMA } from './'
import { isStringAlphanumeric } from './validators/isAlphanumeric'
import { isStringEmail } from './validators/isEmail'
import { isStringRequired } from './validators/isRequired'

describe('String validation', () => {
  it('isRequired', () => {
    expect(STRING_SCHEMA(DEFAULT_INTL, isStringRequired()).isValidSync('Coucou')).toBe(true)

    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired({ active: false })).isValidSync('Coucou')
    ).toBe(true)

    expect(STRING_SCHEMA(DEFAULT_INTL, isStringRequired()).isValidSync(undefined)).toBe(false)

    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired({ active: false })).isValidSync(undefined)
    ).toBe(true)
  })

  it('isAlphanumeric', () => {
    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired(), isStringAlphanumeric()).isValidSync('abc123')
    ).toBe(true)

    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired(), isStringAlphanumeric()).isValidSync('abc123!')
    ).toBe(false)
  })

  it('isEmail', () => {
    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou@eapc.be')
    ).toBe(true)

    expect(
      STRING_SCHEMA(DEFAULT_INTL, isStringRequired(), isStringEmail()).isValidSync('coucou')
    ).toBe(false)
  })
})
