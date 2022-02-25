import _isIPRange from 'validator/lib/isIPRange'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isIPRange>

export interface IIsIPRangeProps {
  /**
   * IP Range version
   */
  version?: TParameters[1]
}

/**
 * Check if the string is an IP Range (version 4 or 6).
 */
export const isIPRange = (
  props?: TReferenceProps<IIsIPRangeProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { version } = parseReference<IIsIPRangeProps>(this, props)

          const result = _isIPRange(value, version)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_ip_range' },
                  { version }
                ),
              })
        },
      })
    }

    return schema
  }
}
