import isMongoId from 'validator/lib/isMongoId'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringMongoIdProps extends IStringProps {}

export const isStringMongoId = (props?: IIsStringMongoIdProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isMongoId(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_mongo_id',
        }),
      })
    }

    return schema
  }
}
