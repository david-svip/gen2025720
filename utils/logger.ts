import { useRequestEvent } from '#app'

export class Logger {
  private static instance: any

  public static getLogger(): any {
    if (!this.instance) {
      if (process.server) {
        const event = useRequestEvent()
        if (event?.context.$logger) {
          this.instance = event.context.$logger
        }else{
          this.instance = console
        }
      } else {
        this.instance = console
      }
    }
    return this.instance
  }

  public static log(message: string, ...args: any[]): void {
    const logger = this.getLogger()
    if (process.server && logger.log) {
      logger.log(message, ...args)
    } else {
      console.log(message, ...args)
    }
  }

  public static info(message: string, ...args: any[]): void {
    const logger = this.getLogger();
    if (process.server && logger && logger.log) {
      logger.log(message, ...args)
    } else {
      console.log(message, ...args)
    }
  }

  public static error(message: string, ...args: any[]): void {
    const logger = this.getLogger()
    if (process.server && logger.log) {
      logger.log(message, ...args)
    } else {
      console.log(message, ...args)
    }
  }
}
