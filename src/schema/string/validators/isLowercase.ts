import isLowercase from 'validator/lib/isLowercase'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringLowercaseProps extends IStringProps {}

export const isStringLowercase = (props?: IIsStringLowercaseProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isLowercase(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_lowercase',
        }),
      })
    }

    return schema
  }
}
