import isSemVer from 'validator/lib/isSemVer'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringSemVerProps extends IStringProps {}

export const isStringSemVer = (props?: IIsStringSemVerProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isSemVer(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_sem_ver',
        }),
      })
    }

    return schema
  }
}
