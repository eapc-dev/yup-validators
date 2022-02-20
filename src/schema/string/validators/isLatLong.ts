import isLatLong from 'validator/lib/isLatLong'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringLatLong extends IStringProps {}

export const isStringLatLong = (props?: IIsStringLatLong): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isLatLong(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_a_lat_long' }),
      })
    }

    return schema
  }
}
