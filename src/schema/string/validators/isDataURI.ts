import isDataURI from 'validator/lib/isDataURI'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringDataURIProps extends IStringProps {}

export const isStringDataURI = (props?: IIsStringDataURIProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isDataURI(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_data_uri',
        }),
      })
    }

    return schema
  }
}
