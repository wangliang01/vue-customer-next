<template>
  <div>
    <div class="select-org y-flex y-row-between" @click="handleShow">
      <div class="label">
        {{ curOrg.orgName }}
      </div>
      <div class="icon-arrow-right iconjinru iconfont"></div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{height: '30%'}">
      <van-picker
        :columns="orgInfo"
        :columns-field-names="columnsFieldNames"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      ></van-picker>
    </van-popup>
  </div>
</template>
<script>
import { useOrgInfo } from '@/hooks/useOrgInfo'
import { usePicker } from '@/hooks/usePicker'
import { usePopup } from '@/hooks/usePopup'
export default {
  name: 'SelectOrg',
  components: {
  },
  props: {
  },
  setup(props, ctx) {
    const columnsFieldNames = {
      text: 'orgName',
      children: 'children'
    }
    // 获取组织信息
    const { orgInfo } = useOrgInfo()
    const { show, handleShow } = usePopup()
    const { curOrg, handleConfirm, handleCancel } = usePicker(show, ctx)

    return {
      columnsFieldNames,
      handleShow,
      show,
      orgInfo,
      handleConfirm,
      handleCancel,
      curOrg
    }
  }
}
</script>

<style lang="scss" scoped>
.select-org {
  margin: 22px 24px;
  height: 86px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 0 32px;
}
</style>
