import isBase32 from 'validator/lib/isBase32'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringBase32Props extends IStringProps {}

export const isStringBase32 = (props?: IIsStringBase32Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBase32(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_base32' }),
      })
    }

    return schema
  }
}
