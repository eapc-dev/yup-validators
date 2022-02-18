import isBase58 from 'validator/lib/isBase58'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringBase58Props extends IStringProps {}

export const isStringBase58 = (props?: IIsStringBase58Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBase58(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_base58' }),
      })
    }

    return schema
  }
}
