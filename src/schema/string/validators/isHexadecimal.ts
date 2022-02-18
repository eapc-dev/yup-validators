import isHexadecimal from 'validator/lib/isHexadecimal'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringHexadecimalProps extends IStringProps {}

export const isStringHexadecimal = (props?: IIsStringHexadecimalProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isHexadecimal(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_hexadecimal_number',
        }),
      })
    }

    return schema
  }
}
