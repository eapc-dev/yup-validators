import _isISSN from 'validator/lib/isISSN'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isISSN>

export interface IIsISSNProps {
  /**
   * Options is an object which defaults to `{ case_sensitive: false, require_hyphen: false }`. If `case_sensitive` is `true`, ISSNs with a lowercase 'x' as the check digit are rejected.
   */
  options?: TParameters[1]
}

/**
 * Check if the string is an [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number).
 */
export const isISSN = (
  props?: TReferenceProps<IIsISSNProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsISSNProps>(this, props)

          const result = _isISSN(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_issn' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
