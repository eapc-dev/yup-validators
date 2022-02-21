import mapKeys from 'lodash.mapkeys'
import snakeCase from 'lodash.snakecase'
import * as yup from 'yup'
import Reference from 'yup/lib/Reference'
import { Maybe } from 'yup/lib/types'

import { TReferenceProps } from '../'
import { TFormatMessage } from '../i18n/placeholder'

export type TMessage = string | Parameters<TFormatMessage>

export const getValueFromContext = <T>(
  context: yup.TestContext,
  ref: Reference<T> | Maybe<T>
): Maybe<T> => {
  return ref instanceof Reference ? context.resolve(ref) : ref
}

export const parseReference = <T extends Maybe<object>>(
  context: yup.TestContext,
  props?: TReferenceProps<T>
): T => {
  const newValue: Partial<T> = {}

  for (const key in props) {
    const value = props[key]

    if (value instanceof Reference) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newValue[key] = getValueFromContext(context, value)
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // @ts-expect-error
      newValue[key] = parseReference(context, value)
    }
  }

  return { ...(props as T), ...newValue }
}

export const formatMessageValues = (
  values: Parameters<TFormatMessage>[1]
): Parameters<TFormatMessage>[1] => {
  return mapKeys(values, (v, k) => snakeCase(k))
}
