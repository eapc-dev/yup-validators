import _isHash from 'validator/lib/isHash'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isHash>

export interface IIsHashProps {
  /**
   * Algorithm is one of [`md4`, `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `ripemd128`, `ripemd160`, `tiger128`, `tiger160`, `tiger192`, `crc32`, `crc32b`]
   */
  algorithm: TParameters[1]
}

/**
 * Check if the string is a hash of type algorithm.
 */
export const isHash = (
  props: TReferenceProps<IIsHashProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { algorithm } = parseReference<IIsHashProps>(this, props)

          const result = _isHash(value, algorithm)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_hash' },
                  { algorithm }
                ),
              })
        },
      })
    }

    return schema
  }
}
