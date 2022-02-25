import _isVariableWidth from 'validator/lib/isVariableWidth'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsVariableWidthProps {}

/**
 * Check if the string contains a mixture of full and half-width chars.
 */
export const isVariableWidth = (
  props?: TReferenceProps<IIsVariableWidthProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isVariableWidth(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_variable_width',
        }),
      })
    }

    return schema
  }
}
