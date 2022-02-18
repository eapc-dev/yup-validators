import isFullWidth from 'validator/lib/isFullWidth'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringFullWidthProps extends IStringProps {}

export const isStringFullWidth = (props?: IIsStringFullWidthProps): TStringValidatorResult => {
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
