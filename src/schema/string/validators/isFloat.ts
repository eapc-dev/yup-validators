import isFloat from 'validator/lib/isFloat'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isFloat>

export interface IIsStringFloat extends IStringProps {
  options?: TParameters[1]
}

export const isStringFloat = (props?: IIsStringFloat): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isFloat(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_float' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
