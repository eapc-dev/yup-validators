import _isPostalCode from 'validator/lib/isPostalCode'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isPostalCode>

export interface IIsPostalCodeProps {
  /**
   * Locale is one of [ `AD`, `AT`, `AU`, `AZ`, `BE`, `BG`, `BR`, `BY`, `CA`, `CH`, `CN`, `CZ`, `DE`, `DK`, `DO`, `DZ`, `EE`, `ES`, `FI`, `FR`, `GB`, `GR`, `HR`, `HT`, `HU`, `ID`, `IE` `IL`, `IN`, `IR`, `IS`, `IT`, `JP`, `KE`, `KR`, `LI`, `LK`, `LT`, `LU`, `LV`, `MT`, `MX`, `MY`, `NL`, `NO`, `NP`, `NZ`, `PL`, `PR`, `PT`, `RO`, `RU`, `SA`, `SE`, `SG`, `SI`, `TH`, `TN`, `TW`, `UA`, `US`, `ZA`, `ZM` ]
   */
  locale: TParameters[1]
}

/**
 * Check if the string is a postal code.
 */
export const isPostalCode = (
  props: TReferenceProps<IIsPostalCodeProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { locale } = parseReference<IIsPostalCodeProps>(this, props)

          const result = _isPostalCode(value, locale)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_postal_code' },
                  { locale }
                ),
              })
        },
      })
    }

    return schema
  }
}
