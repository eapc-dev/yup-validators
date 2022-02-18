import isNumeric from 'validator/lib/isNumeric'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isNumeric>

export interface IIsStringNumeric extends IStringProps {
  options?: TParameters[1]
}

export const isStringNumeric = (props?: IIsStringNumeric): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isNumeric(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_numeric' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
