import { getComponentName } from '@/utils'
export default app => {
  const componentsContext = require.context('@/components', true, /index.vue/)
  componentsContext.keys().forEach(componentPath => {
    // 获取文件中的default模块
    const componentConfig = componentsContext(componentPath)
    const component = componentConfig.default || componentConfig
    const componentName = getComponentName(component.name)
    app.component(componentName, component)
  })
}
