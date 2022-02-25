import _isUUID from 'validator/lib/isUUID'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isUUID>

export interface IIsUUIDProps {
  /**
   * UUID version
   */
  version?: TParameters[1]
}

/**
 * Check if the string is a UUID (version 3, 4 or 5).
 */
export const isUUID = (
  props?: TReferenceProps<IIsUUIDProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { version } = parseReference<IIsUUIDProps>(this, props)

          const result = _isUUID(value, version)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_uuid' },
                  { version }
                ),
              })
        },
      })
    }

    return schema
  }
}
