// Import necessary libraries
import { type ZodTypeAny, z } from 'zod'
import { ref, toValue, type MaybeRefOrGetter } from 'vue'

export default <T extends ZodTypeAny>(
  schema: T,
  data: MaybeRefOrGetter<Record<string, unknown>>
) => {
  const errors = ref<Record<string, z.ZodIssue[]> | null>(null)

  const validate = async () => {
    errors.value = null

    const result = await schema.safeParseAsync(toValue(data))

    if (!result.success) {
      errors.value = groupByPath(result.error.issues, 'path')
    }

    return errors
  }

  const getError = (path: string) => {
    const keys = path.replace(/\./g, ',').split(',')
    let current: any = errors.value
    for (const key of keys) {
      if (current === null || current === undefined) return undefined
      current = current[key]
    }
    return current?.[0]?.message
  }

  const groupByPath = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce(
      (acc, obj) => {
        const path = (obj[key] as unknown as string[]).join('.')
        if (!acc[path]) {
          acc[path] = []
        }
        acc[path].push(obj)
        return acc
      },
      {} as Record<string, T[]>
    )
  }

  return { validate, errors, getError }
}
