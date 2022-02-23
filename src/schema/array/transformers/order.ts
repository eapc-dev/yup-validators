import _orderBy from 'lodash.orderby'
import * as yup from 'yup'

import { IArrayProps, TArrayValidatorResult } from '../_types'

type TParameters = Parameters<typeof _orderBy>

export interface IOrderProps {
  /**
   * The iteratees to sort by.
   */
  iteratees: TParameters[1]

  /**
   * The sort orders of `iteratees`.
   */
  orders: TParameters[2]
}

/**
 * Order a list using lodash.
 */
export const order = <T extends yup.AnySchema>(
  props: IOrderProps & Omit<IArrayProps, 'message'>
): TArrayValidatorResult<T> => {
  const { iteratees, orders, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) =>
        Array.isArray(v) ? _orderBy(v, iteratees, orders) : v
      )
    }

    return schema
  }
}
