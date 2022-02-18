import isISIN from 'validator/lib/isISIN'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISINProps extends IStringProps {}

export const isStringISIN = (props?: IIsStringISINProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isISIN(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_isin',
        }),
      })
    }

    return schema
  }
}
