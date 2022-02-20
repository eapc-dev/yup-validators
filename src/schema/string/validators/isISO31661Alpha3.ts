import isISO31661Alpha3 from 'validator/lib/isISO31661Alpha3'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISO31661Alpha3Props extends IStringProps {}

export const isStringISO31661Alpha3 = (
  props?: IIsStringISO31661Alpha3Props
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISO31661Alpha3(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_iso31661alpha3_country_code',
        }),
      })
    }

    return schema
  }
}
