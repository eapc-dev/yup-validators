import isISBN from 'validator/lib/isISBN'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isISBN>

export interface IIsStringISBN extends IStringProps {
  version?: TParameters[1]
}

export const isStringISBN = (props?: IIsStringISBN): TStringValidatorResult => {
  const { version, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isISBN(value, version)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_isbn' },
          { version }
        ),
      })
    }

    return schema
  }
}
