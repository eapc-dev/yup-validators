import _isEAN from 'validator/lib/isEAN'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsEANProps {}

/**
 * Check if the string is an EAN (European Article Number).
 */
export const isEAN = (
  props?: TReferenceProps<IIsEANProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isEAN(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_an_ean',
        }),
      })
    }

    return schema
  }
}
