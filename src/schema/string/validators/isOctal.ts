import isOctal from 'validator/lib/isOctal'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringOctalProps extends IStringProps {}

export const isStringOctal = (props?: IIsStringOctalProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isOctal(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_octal_number',
        }),
      })
    }

    return schema
  }
}
