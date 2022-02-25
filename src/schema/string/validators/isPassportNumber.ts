import _isPassportNumber from 'validator/lib/isPassportNumber'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isPassportNumber>

export interface IIsPassportNumberProps {
  /**
   * CountryCode is one of [ `AM`, `AR`, `AT`, `AU`, `BE`, `BG`, `BY`, `BR`, `CA`, `CH`, `CN`, `CY`, `CZ`, `DE`, `DK`, `DZ`, `EE`, `ES`, `FI`, `FR`, `GB`, `GR`, `HR`, `HU`, `IE` `IN`, `IR`, `ID`, `IS`, `IT`, `JP`, `KR`, `LT`, `LU`, `LV`, `LY`, `MT`, `MY`, `MZ`, `NL`, `PL`, `PT`, `RO`, `RU`, `SE`, `SL`, `SK`, `TR`, `UA`, `US` ]
   */
  countryCode?: TParameters[1]
}

/**
 * Check if the string is a valid passport number relative to a specific country code.
 */
export const isPassportNumber = (
  props?: TReferenceProps<IIsPassportNumberProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { countryCode } = parseReference<IIsPassportNumberProps>(this, props)

          const result = _isPassportNumber(value, countryCode)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_passport_number' },
                  { country_code: countryCode }
                ),
              })
        },
      })
    }

    return schema
  }
}
