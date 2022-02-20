import isISO4217 from 'validator/lib/isISO4217'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISO4217Props extends IStringProps {}

export const isStringISO4217 = (props?: IIsStringISO4217Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISO4217(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_iso4217_currency_code',
        }),
      })
    }

    return schema
  }
}
