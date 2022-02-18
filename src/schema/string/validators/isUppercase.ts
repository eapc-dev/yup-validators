import isUppercase from 'validator/lib/isUppercase'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringUppercaseProps extends IStringProps {}

export const isStringUppercase = (props?: IIsStringUppercaseProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isUppercase(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_uppercase',
        }),
      })
    }

    return schema
  }
}
