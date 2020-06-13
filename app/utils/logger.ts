// a super simple logger that only logs in DEV
export default function log(...args: any[]) {
  if (__DEV__) {
    console.log(...args)
  }
}
