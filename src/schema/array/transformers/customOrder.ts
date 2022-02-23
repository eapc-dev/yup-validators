import * as yup from 'yup'

import { IArrayProps, TArrayValidatorResult } from '../_types'

export interface ICustomOrderProps<U> {
  /**
   * The compare function to be used for the sort.
   */
  compareFn: (a: U, b: U) => number
}

/**
 * Order a list using a compare function.
 */
export const customOrder = <T extends yup.AnySchema<U>, U>(
  props: ICustomOrderProps<U> & Omit<IArrayProps, 'message'>
): TArrayValidatorResult<T> => {
  const { compareFn, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (Array.isArray(v) ? v.sort(compareFn) : v))
    }

    return schema
  }
}
