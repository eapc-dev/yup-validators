import _isBase64 from 'validator/lib/isBase64'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isBase64>

export interface IIsBase64Props {
  /**
   * `options` is optional and defaults to `{ urlSafe: false }`.
     When `urlSafe` is `true` it tests the given base64 encoded string is [url safe](https://base64.guru/standards/base64url).
   */
  options?: TParameters[1]
}

/**
 * Check if a string is base64 encoded.
 */
export const isBase64 = (
  props?: TReferenceProps<IIsBase64Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsBase64Props>(this, props)

          const result = _isBase64(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_base64' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
