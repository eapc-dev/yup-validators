import isFullWidth from 'validator/lib/isFullWidth'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IContainsStringFullWidthCharsProps extends IStringProps {}

export const containsStringFullWidthChars = (
  props?: IContainsStringFullWidthCharsProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isFullWidth(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_contains_full_width_chars',
        }),
      })
    }

    return schema
  }
}
