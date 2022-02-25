import _isWhitelisted from 'validator/lib/isWhitelisted'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isWhitelisted>

export interface IIsWhitelistedProps {
  /**
   * Whitelist, can be either a string or an array of strings.
   */
  chars: TParameters[1]
}

/**
 * Checks characters if they appear in the whitelist.
 */
export const isWhitelisted = (
  props: TReferenceProps<IIsWhitelistedProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { chars } = parseReference<IIsWhitelistedProps>(this, props)

          const result = _isWhitelisted(value, chars)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_whitelisted' },
                  {
                    chars: Array.isArray(chars) ? intl.formatList(chars) : chars,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
