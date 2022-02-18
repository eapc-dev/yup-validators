import isHash from 'validator/lib/isHash'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isHash>

export interface IIsStringHashProps extends IStringProps {
  algorithm: TParameters[1]
}

export const isStringHash = (props: IIsStringHashProps): TStringValidatorResult => {
  const { algorithm, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isHash(value, algorithm)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_hash' },
          { algorithm }
        ),
      })
    }

    return schema
  }
}
