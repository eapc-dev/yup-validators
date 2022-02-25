import _isVAT from 'validator/lib/isVAT'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isVAT>

export interface IIsVATProps {
  /**
   * Available country codes: [ `GB`, `IT`,`NL` ].
   */
  countryCode: TParameters[1]
}

/**
 * Checks that the string is a valid VAT number.
 */
export const isVAT = (
  props: TReferenceProps<IIsVATProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { countryCode } = parseReference<IIsVATProps>(this, props)

          const result = _isVAT(value, countryCode)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_vat_number' },
                  { country_code: countryCode }
                ),
              })
        },
      })
    }

    return schema
  }
}
