import _isFQDN from 'validator/lib/isFQDN'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isFQDN>

export interface IIsFQDNProps {
  options?: TParameters[1]
}

/**
 * Check if the string is a fully qualified domain name (e.g. `domain.com`).
 */
export const isFQDN = (
  props?: TReferenceProps<IIsFQDNProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsFQDNProps>(this, props)

          const result = _isFQDN(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_fqdn' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
