import _isIP from 'validator/lib/isIP'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isIP>

export interface IIsIPProps {
  /**
   * IP Version
   */
  version?: TParameters[1]
}

/**
 * Check if the string is an IP (version 4 or 6).
 */
export const isIP = (
  props?: TReferenceProps<IIsIPProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { version } = parseReference<IIsIPProps>(this, props)

          const result = _isIP(value, version)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_ip' },
                  { version }
                ),
              })
        },
      })
    }

    return schema
  }
}
