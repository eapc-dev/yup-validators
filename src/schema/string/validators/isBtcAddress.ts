import _isBtcAddress from 'validator/lib/isBtcAddress'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsBtcAddressProps {}

/**
 * Check if the string is a valid BTC address.
 */
export const isBtcAddress = (
  props?: TReferenceProps<IIsBtcAddressProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isBtcAddress(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.y_v.s_must_be_a_btc_address' }),
      })
    }

    return schema
  }
}
