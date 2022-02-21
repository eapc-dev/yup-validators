import _isPassportNumber from 'validator/lib/isPassportNumber'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isPassportNumber>

export interface IIsPassportNumberProps {
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
          if (!value) return true

          const { countryCode } = parseReference<IIsPassportNumberProps>(this, props)

          const result = _isPassportNumber(value, countryCode)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_passport_number' },
                  { country_code: countryCode }
                ),
              })
        },
      })
    }

    return schema
  }
}
