import Big from 'big.js'

import { INumberProps, TNumberValidatorResult } from '../_types'

export interface ICeilProps {
  /**
   * Decimal places.
   */
  precision: number
}

/**
 * Ceil a number to the specified `precision`.
 */
export const ceil = (props: ICeilProps & Omit<INumberProps, 'message'>): TNumberValidatorResult => {
  const { precision, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        typeof v === 'number' ? Big(v).round(precision, Big.roundUp).toNumber() : v
      )
    }

    return schema
  }
}
