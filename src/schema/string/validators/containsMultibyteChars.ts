import isMultibyte from 'validator/lib/isMultibyte'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsMultibyteCharsProps {}

/**
 * Check if the string contains one or more multibyte chars.
 */
export const containsMultibyteChars = (
  props?: TReferenceProps<IContainsMultibyteCharsProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return isMultibyte(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_contains_multibyte_chars',
        }),
      })
    }

    return schema
  }
}
