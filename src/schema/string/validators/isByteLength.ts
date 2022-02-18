import isByteLength from 'validator/lib/isByteLength'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isByteLength>

export interface IIsStringByteLengthProps extends IStringProps {
  options?: TParameters[1]
}

export const isStringByteLength = (props?: IIsStringByteLengthProps): TStringValidatorResult => {
  const { options, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isByteLength(value, options)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_byte_length' },
          { ...options }
        ),
      })
    }

    return schema
  }
}
