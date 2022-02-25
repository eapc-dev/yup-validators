import _isEthereumAddress from 'validator/lib/isEthereumAddress'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsEthereumAddressProps {}

/**
 * Check if the string is an [Ethereum](https://ethereum.org/) address using basic regex. Does not validate address checksums.
 */
export const isEthereumAddress = (
  props?: TReferenceProps<IIsEthereumAddressProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isEthereumAddress(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_ethereum_address',
        }),
      })
    }

    return schema
  }
}
