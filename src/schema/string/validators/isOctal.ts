import _isOctal from 'validator/lib/isOctal'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsOctalProps {}

/**
 * Check if the string is a valid octal number.
 */
export const isOctal = (
  props?: TReferenceProps<IIsOctalProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isOctal(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_octal_number',
        }),
      })
    }

    return schema
  }
}
