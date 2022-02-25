import isSurrogatePair from 'validator/lib/isSurrogatePair'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsSurrogatePairCharsProps {}

/**
 * Check if the string contains any surrogate pairs chars.
 */
export const containsSurrogatePairChars = (
  props?: TReferenceProps<IContainsSurrogatePairCharsProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return isSurrogatePair(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_contains_surrogate_pairs_chars',
        }),
      })
    }

    return schema
  }
}
