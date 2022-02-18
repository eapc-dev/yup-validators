import isBtcAddress from 'validator/lib/isBtcAddress'

import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringBtcAddressProps extends IStringProps {}

export const isStringBtcAddress = (props?: IIsStringBtcAddressProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test: (value) => {
          if (!value) return true

          return isBtcAddress(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.field.s_must_be_a_btc_address' }),
      })
    }

    return schema
  }
}
