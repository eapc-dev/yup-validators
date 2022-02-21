import _isBase64 from 'validator/lib/isBase64'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isBase64>

export interface IIsBase64Props {
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
          if (!value) return true

          const { options } = parseReference<IIsBase64Props>(this, props)

          const result = _isBase64(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_base64' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
