import Big from 'big.js'

import { INumberProps, TNumberValidatorResult } from '../_types'

export interface ITruncProps {
  /**
   * Decimal places.
   */
  precision: number
}

/**
 * Truncate a number to the specified `precision`.
 */
export const trunc = (
  props: ITruncProps & Omit<INumberProps, 'message'>
): TNumberValidatorResult => {
  const { precision, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        typeof v === 'number' ? Big(v).round(precision, Big.roundDown).toNumber() : v
      )
    }

    return schema
  }
}
