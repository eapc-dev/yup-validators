import isMagnetURI from 'validator/lib/isMagnetURI'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringMagnetURIProps extends IStringProps {}

export const isStringMagnetURI = (props?: IIsStringMagnetURIProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isMagnetURI(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_magnet_uri',
        }),
      })
    }

    return schema
  }
}
