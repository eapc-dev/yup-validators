import isEthereumAddress from 'validator/lib/isEthereumAddress'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringEthereumAddressProps extends IStringProps {}

export const isStringEthereumAddress = (
  props?: IIsStringEthereumAddressProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          return isEthereumAddress(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.field.s_must_be_an_ethereum_address',
        }),
      })
    }

    return schema
  }
}
