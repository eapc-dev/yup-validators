import _isPort from 'validator/lib/isPort'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsPortProps {}

/**
 * Check if the string is a valid port number.
 */
export const isPort = (
  props?: TReferenceProps<IIsPortProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isPort(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_port_number',
        }),
      })
    }

    return schema
  }
}
