import isIP from 'validator/lib/isIP'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isIP>

export interface IIsStringIP extends IStringProps {
  version?: TParameters[1]
}

export const isStringIO = (props?: IIsStringIP): TStringValidatorResult => {
  const { version, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isIP(value, version)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_an_ip' }, { version }),
      })
    }

    return schema
  }
}
