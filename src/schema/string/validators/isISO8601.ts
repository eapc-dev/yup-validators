import isISO8601 from 'validator/lib/isISO8601'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISO8601Props extends IStringProps {}

export const isStringISO8601 = (props?: IIsStringISO8601Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isISO8601(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_iso8601_date',
        }),
      })
    }

    return schema
  }
}
