import * as yup from 'yup'
import Reference from 'yup/lib/Reference'
import { Maybe } from 'yup/lib/types'

import { TFormatMessage } from '../i18n/placeholder'

export type TMessage = string | Parameters<TFormatMessage>

export const getValueFromContext = <T>(
  context: yup.TestContext,
  ref: Reference<T> | Maybe<T>
): Maybe<T> => {
  return ref instanceof Reference ? context.resolve(ref) : ref
}
