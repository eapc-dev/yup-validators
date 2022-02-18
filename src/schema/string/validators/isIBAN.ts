import isIBAN from 'validator/lib/isIBAN'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringIBANProps extends IStringProps {}

export const isStringIBAN = (props?: IIsStringIBANProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isIBAN(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_iban',
        }),
      })
    }

    return schema
  }
}
