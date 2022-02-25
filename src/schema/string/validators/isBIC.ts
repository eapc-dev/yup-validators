import _isBIC from 'validator/lib/isBIC'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsBICProps {}

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 */
export const isBIC = (
  props?: TReferenceProps<IIsBICProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isBIC(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.y_v.s_must_be_bic' }),
      })
    }

    return schema
  }
}
