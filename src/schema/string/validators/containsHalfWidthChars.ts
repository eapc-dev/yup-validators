import isHalfWidth from 'validator/lib/isHalfWidth'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsHalfWidthCharsProps {}

/**
 * Check if the string contains any half-width chars.
 */
export const containsHalfWidthChars = (
  props?: TReferenceProps<IContainsHalfWidthCharsProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return isHalfWidth(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_contains_half_width_chars',
        }),
      })
    }

    return schema
  }
}
