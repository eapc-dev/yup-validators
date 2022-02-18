import isSurrogatePair from 'validator/lib/isSurrogatePair'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringSurrogatePairProps extends IStringProps {}

export const isStringSurrogatePair = (
  props?: IIsStringSurrogatePairProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
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
