import _isLowercase from 'validator/lib/isLowercase'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsLowercaseProps {}

/**
 * Check if the string is lowercase.
 */
export const isLowercase = (
  props?: TReferenceProps<IIsLowercaseProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isLowercase(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_lowercase',
        }),
      })
    }

    return schema
  }
}
