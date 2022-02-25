import _isUppercase from 'validator/lib/isUppercase'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsUppercaseProps {}

/**
 * Check if the string is uppercase.
 */
export const isUppercase = (
  props?: TReferenceProps<IIsUppercaseProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isUppercase(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_uppercase',
        }),
      })
    }

    return schema
  }
}
