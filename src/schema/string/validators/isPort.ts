import isPort from 'validator/lib/isPort'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringPortProps extends IStringProps {}

export const isStringPort = (props?: IIsStringPortProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isPort(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_port_number',
        }),
      })
    }

    return schema
  }
}
