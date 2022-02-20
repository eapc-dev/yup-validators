import isUUID from 'validator/lib/isUUID'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof isUUID>

export interface IIsStringUUID extends IStringProps {
  version?: TParameters[1]
}

export const isStringUUID = (props?: IIsStringUUID): TStringValidatorResult => {
  const { version, active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isUUID(value, version)
        },
        message: intl.formatErrorMessage(
          { id: message ?? 'e.field.s_must_be_an_uuid' },
          { version }
        ),
      })
    }

    return schema
  }
}
