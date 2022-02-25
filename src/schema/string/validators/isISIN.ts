import _isISIN from 'validator/lib/isISIN'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsISINProps {}

/**
 * Check if the string is an [ISIN](https://en.wikipedia.org/wiki/International_Securities_Identification_Number) (stock/security identifier).
 */
export const isISIN = (
  props?: TReferenceProps<IIsISINProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isISIN(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_isin',
        }),
      })
    }

    return schema
  }
}
