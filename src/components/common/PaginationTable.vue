<script setup lang="ts">
import {
  Button,
} from '@/components/ui/button'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

interface Props {
  total: number
  currentPage: number
}
const props = defineProps<Props>()
function hanleClick(item: { type: string, value: number }) {
  console.log(item.value)
}

</script>

<template>
  <Pagination v-slot="{ page }" :total="props.total" :sibling-count="1" show-edges :default-page="props.currentPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1 justify-center">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="hanleClick(item)">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
