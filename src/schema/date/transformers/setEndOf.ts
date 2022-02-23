import dayjs from 'dayjs'

import { IDateProps, TDateValidatorResult } from '../_types'

export interface IEndOfProps {
  /**
   * Unit to be used.
   */
  unit: dayjs.OpUnitType
}

/**
 * Set the date to the end of `unit`.
 */
export const setEndOf = (
  props: IEndOfProps & Omit<IDateProps, 'message'>
): TDateValidatorResult => {
  const { unit, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v) => {
        const date = dayjs(v)
        if (!date.isValid()) {
          return v as unknown
        }

        return date.endOf(unit).toDate()
      })
    }

    return schema
  }
}
