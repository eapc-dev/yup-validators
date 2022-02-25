import _isHexadecimal from 'validator/lib/isHexadecimal'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsHexadecimalProps {}

/**
 * Check if the string is a hexadecimal number.
 */
export const isHexadecimal = (
  props?: TReferenceProps<IIsHexadecimalProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isHexadecimal(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_hexadecimal_number',
        }),
      })
    }

    return schema
  }
}
