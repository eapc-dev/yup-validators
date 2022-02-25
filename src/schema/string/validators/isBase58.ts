import _isBase58 from 'validator/lib/isBase58'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsBase58Props {}

/**
 * check if a string is base58 encoded
 */
export const isBase58 = (
  props?: TReferenceProps<IIsBase58Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isBase58(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.y_v.s_must_be_base58' }),
      })
    }

    return schema
  }
}
