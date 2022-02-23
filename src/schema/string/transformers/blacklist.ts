import _blacklist from 'validator/lib/blacklist'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _blacklist>

export interface IBlacklistProps {
  /**
   * Blacklist to be used.  The characters are used in a RegExp and so you will need to escape some chars, e.g. `\\[\\]`.
   */
  chars: TParameters[1]
}

/**
 * Remove characters that appear in the blacklist.
 */
export const blacklist = (
  props: IBlacklistProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { chars, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _blacklist(v, chars) : v))
    }

    return schema
  }
}
