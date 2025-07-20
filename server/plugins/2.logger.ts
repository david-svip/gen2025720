import { H3Error } from 'h3'

interface LogstashConfig {
  url: string;

}

class LogstashLogger {
  config: LogstashConfig; // 声明 config 属性

  constructor(config: LogstashConfig) {
    this.config = config; // 初始化 config 属性
  }

  async log(event: any, data: any) {
    const logstashJSON = JSON.stringify({
      message: event,
      data: data,
      datetime: new Date().toISOString()
    });
    try {
      const response:any = await $fetch(this.config.url, {
        method: 'POST',
        body: logstashJSON,
      });
      console.log(`${response.data}`);
      return response; // 可以返回响应供调用者使用
    } catch (error) {
      console.error(`Logstash Logger Error: ${error}`);
    }
  }
}

export default defineNitroPlugin((nitroApp) => {
  const { public: { logstash } } = useRuntimeConfig()
  const url = logstash?.url || '';

  const loggerConfig: LogstashConfig = {
    url: url, // 使用配置的 URL
  };
  
  const logger = new LogstashLogger(loggerConfig);

  nitroApp.hooks.hook('error', (error) => {
    if (error instanceof H3Error && (error.statusCode === 404 || error.statusCode === 422)) {
      return;
    }
    logger.log('Error occurred:', error);
  });

  nitroApp.hooks.hook('request', (event) => {
    event.context.$logger = logger // 将 logger 实例添加到请求上下文中
  });

  nitroApp.hooks.hookOnce('close', async () => {
    // 执行任何清理操作
  })
})
