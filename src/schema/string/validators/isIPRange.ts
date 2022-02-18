import isIPRange from 'validator/lib/isIPRange'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isIPRange>

export interface IIsStringIPRange extends IStringProps {
  version?: TParameters[1]
}

export const isStringIPRange = (props?: IIsStringIPRange): TStringValidatorResult => {
  const { version, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isIPRange(value, version)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_an_ip' }, { version }),
      })
    }

    return schema
  }
}
