import isMD5 from 'validator/lib/isMD5'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringMD5Props extends IStringProps {}

export const isStringMD5 = (props?: IIsStringMD5Props): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isMD5(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_md5_hash',
        }),
      })
    }

    return schema
  }
}
