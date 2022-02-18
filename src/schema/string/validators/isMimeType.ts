import isMimeType from 'validator/lib/isMimeType'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringMimeTypeProps extends IStringProps {}

export const isStringMimeType = (props?: IIsStringMimeTypeProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isMimeType(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_mime_type',
        }),
      })
    }

    return schema
  }
}
