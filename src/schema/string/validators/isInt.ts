import isInt from 'validator/lib/isInt'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isInt>

export interface IIsStringInt extends IStringProps {
  options?: TParameters[1]
}

export const isStringInt = (props?: IIsStringInt): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isInt(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_int' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
