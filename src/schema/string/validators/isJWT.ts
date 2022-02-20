import isJWT from 'validator/lib/isJWT'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringJWTProps extends IStringProps {}

export const isStringJWT = (props?: IIsStringJWTProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isJWT(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_jwt',
        }),
      })
    }

    return schema
  }
}
