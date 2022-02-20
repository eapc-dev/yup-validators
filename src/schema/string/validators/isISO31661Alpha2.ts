import isISO31661Alpha2 from 'validator/lib/isISO31661Alpha2'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringISO31661Alpha2Props extends IStringProps {}

export const isStringISO31661Alpha2 = (
  props?: IIsStringISO31661Alpha2Props
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISO31661Alpha2(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_iso31661alpha2_country_code',
        }),
      })
    }

    return schema
  }
}
