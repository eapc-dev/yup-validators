import Big from 'big.js'

import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IFloorProps {
  /**
   * Decimal places.
   */
  precision: number
}

/**
 * Floor a number to the specified `precision`.
 */
export const floor = (
  props: IFloorProps & Omit<INumberProps, 'message'>
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
