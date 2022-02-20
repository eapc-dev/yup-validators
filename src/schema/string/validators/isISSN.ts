import isISSN from 'validator/lib/isISSN'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isISSN>

export interface IIsStringISSN extends IStringProps {
  options?: TParameters[1]
}

export const isStringISSN = (props?: IIsStringISSN): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISSN(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_issn' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
