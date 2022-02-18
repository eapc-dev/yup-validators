import isHalfWidth from 'validator/lib/isHalfWidth'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsStringHalfWidthCharsProps extends IStringProps {}

export const containsStringHalfWidthChars = (
  props?: IContainsStringHalfWidthCharsProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isHalfWidth(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_contains_half_width_chars',
        }),
      })
    }

    return schema
  }
}
