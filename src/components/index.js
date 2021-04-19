import { getComponentName } from '@/utils'
export default app => {
  const componentsContext = require.context('@/components', true, /index.vue/)
  console.log('组件上下文', componentsContext.keys())
  componentsContext.keys().forEach(componentPath => {
    // 获取文件中的default模块
    const componentConfig = componentsContext(componentPath)
    console.log(componentConfig.default)
    const component = componentConfig.default || componentConfig
    const componentName = getComponentName(component.name)
    app.component(componentName, component)
  })
}
