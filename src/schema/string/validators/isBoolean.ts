import isBoolean from 'validator/lib/isBoolean'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isBoolean>

export interface IIsStringBooleanProps extends IStringProps {
  options?: TParameters[1]
}

export const isStringBoolean = (props?: IIsStringBooleanProps): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBoolean(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_a_boolean' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
