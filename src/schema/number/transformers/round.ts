import Big from 'big.js'

import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IRoundProps {
  /**
   * Decimal places.
   */
  precision: number
}

/**
 * Round a number to the specified `precision`.
 */
export const round = (
  props: IRoundProps & Omit<INumberProps, 'message'>
): TNumberValidatorResult => {
  const { precision, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        typeof v === 'number' ? Big(v).round(precision).toNumber() : v
      )
    }

    return schema
  }
}
