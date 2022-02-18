import isDecimal from 'validator/lib/isDecimal'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isDecimal>

export interface IIsStringDecimalProps extends IStringProps {
  options?: TParameters[1]
}

export const isStringDecimal = (props?: IIsStringDecimalProps): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isDecimal(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_decimal_number' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
