import mapKeys from 'lodash.mapkeys'
import snakeCase from 'lodash.snakecase'
import * as yup from 'yup'
import Reference from 'yup/lib/Reference'
import { Maybe } from 'yup/lib/types'

import { TReferenceProps } from '../'
import { IIntlShapeRich } from '../i18n/placeholder'

export type TMessage = string | Parameters<IIntlShapeRich['formatMessage']>

export const getValueFromContext = <T>(context: yup.TestContext, ref: Reference<T>): Maybe<T> => {
  return context.resolve(ref)
}

export const parseValue = <T>(
  context: yup.TestContext,
  value: Reference<T> | Maybe<T>
): Maybe<T> => {
  if (
    value instanceof Reference ||
    (typeof value === 'object' && (value as unknown as object).hasOwnProperty('getter'))
  ) {
    return getValueFromContext(context, value as Reference<T>)
  }

  if (
    typeof value === 'string' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'undefined' ||
    value instanceof RegExp ||
    value instanceof Date ||
    value === null
  ) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((e) => parseValue<T>(context, e)) as unknown as T
  }

  if (typeof value === 'object') {
    return parseReference(context, value as unknown as object) as unknown as T
  }

  return value
}

export const parseReference = <T extends Maybe<object>>(
  context: yup.TestContext,
  props?: TReferenceProps<T>
): T => {
  const newValue: Partial<T> = {}

  for (const key in props) {
    const value = props[key]

    // @ts-expect-error
    newValue[key] = parseValue(context, value)
  }

  return { ...(props as T), ...newValue }
}

export const formatMessageValues = (
  values: Parameters<IIntlShapeRich['formatMessage']>[1]
): Parameters<IIntlShapeRich['formatMessage']>[1] => {
  return mapKeys(values, (v, k) => snakeCase(k))
}
