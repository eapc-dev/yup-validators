import _isMagnetURI from 'validator/lib/isMagnetURI'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsMagnetURIProps {}

/**
 * Check if the string is a [magnet uri format](https://en.wikipedia.org/wiki/Magnet_URI_scheme).
 */
export const isMagnetURI = (
  props?: TReferenceProps<IIsMagnetURIProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isMagnetURI(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_magnet_uri',
        }),
      })
    }

    return schema
  }
}
