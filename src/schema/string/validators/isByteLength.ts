import _isByteLength from 'validator/lib/isByteLength'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isByteLength>

export interface IIsByteLengthProps {
  /**
   * `options` is an object which defaults to `{ min:0, max: undefined }`.
   */
  options?: TParameters[1]
}

/**
 * Check if the string's length (in UTF-8 bytes) falls in a range.
 */
export const isByteLength = (
  props?: TReferenceProps<IIsByteLengthProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsByteLengthProps>(this, props)

          const result = _isByteLength(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_byte_length' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
