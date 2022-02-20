import isSurrogatePair from 'validator/lib/isSurrogatePair'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsStringSurrogatePairCharsProps extends IStringProps {}

export const containsStringSurrogatePairChars = (
  props?: IContainsStringSurrogatePairCharsProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isSurrogatePair(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_contains_surrogate_pairs_chars',
        }),
      })
    }

    return schema
  }
}
