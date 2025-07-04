export const triggerOnComplete = <T,>(data: T[], target: HTMLElement | null, listeners: ((data: T[], target: HTMLElement | null) => void)[]) => {
  listeners.forEach((listener) => {
    listener(data, target)
  })
}
