import isMACAddress from 'validator/lib/isMACAddress'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringMACAddressProps extends IStringProps {}

export const isStringMACAddress = (props?: IIsStringMACAddressProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isMACAddress(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_a_mac_address',
        }),
      })
    }

    return schema
  }
}
