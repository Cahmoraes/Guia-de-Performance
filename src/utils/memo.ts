type CallbackFn = (...args: any[]) => any

export function memoization<Callback extends CallbackFn>(callback: Callback) {
  const cache = new Map<string, ReturnType<Callback>>()
  return (...args: Parameters<Callback>): ReturnType<Callback> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)!
    cache.set(key, callback(...args))
    return cache.get(key)!
  }
}

const sumTowNumbers = (operatorOne: number, operatorTwo: number) =>
  operatorOne + operatorTwo

const memoizedSum = memoization(sumTowNumbers) // memoiza a função

console.log(memoizedSum(2, 3)) // salvou no cache
console.log(memoizedSum(2, 3)) // obteve do cache
