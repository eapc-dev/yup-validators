import _isMACAddress from 'validator/lib/isMACAddress'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsMACAddressProps {}

/**
 * Check if the string is a MAC address.
 */
export const isMACAddress = (
  props?: TReferenceProps<IIsMACAddressProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isMACAddress(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_mac_address',
        }),
      })
    }

    return schema
  }
}
