import isMultibyte from 'validator/lib/isMultibyte'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsStringMultibyteCharsProps extends IStringProps {}

export const containsStringMultibyteChars = (
  props?: IContainsStringMultibyteCharsProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isMultibyte(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_contains_multibyte_chars',
        }),
      })
    }

    return schema
  }
}
