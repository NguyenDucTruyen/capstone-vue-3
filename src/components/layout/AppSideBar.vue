<template>
  <div class="flex flex-col items-start gap-5">
    <div class="bg-muted rounded-lg flex flex-col items-start gap-2 w-72 p-2">
      <div class="flex items-start gap-2 w-full p-1.5 rounded bg-muted cursor-pointer hover:bg-secondary">
        <Icon name="IconStarNew" />
        <div class="flex flex-col items-start gap-0.5">
          <span class="text-foreground font-semibold text-sm leading-4">Newest and Recent</span>
          <span class="text-foreground font-normal text-xs leading-3">Find the last update</span>
        </div>
      </div>
      <div class="flex items-start gap-2 w-full p-1.5 rounded bg-muted cursor-pointer hover:bg-secondary">
        <Icon name="IconPopular" />
        <div class="flex flex-col items-start gap-0.5">
          <span class="text-foreground font-semibold text-sm leading-4">Popular of the day</span>
          <span class="text-gray-500 font-normal text-xs leading-3">Shots featured today by curators</span>
        </div>
      </div>
    </div>
  </div>
</template>
