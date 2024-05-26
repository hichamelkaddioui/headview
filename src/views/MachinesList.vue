<template>
  <ButtonView variant="indigo" class="my-12" @click="modalRegisterOpen = true">
    <SquaresPlusIcon class="-ml-1 mr-2 h-6 w-6" aria-hidden="true" />
    Register new machine
  </ButtonView>

  <TableView
    :data="machines"
    :cols="['name', 'user', 'ipAddresses', 'details']"
    :is-loading="isLoading"
  >
    <template #nameCell="{ online, name }">
      <span class="whitespace-nowrap font-medium">
        <BadgeView class="me-2" :is-on="online" />
        {{ name }}
      </span>
    </template>

    <template #ipAddressesColumn>IP Addresses</template>
    <template #ipAddressesCell="{ ipAddresses }">
      <span v-for="ip in ipAddresses" :key="ip" title="Click to copy">
        <UseClipboard v-slot="{ copy, copied }" :source="ip">
          <CodeBlock :text="copied ? 'Copied!' : ip" @click="copy()" />
        </UseClipboard>
      </span>
    </template>

    <template #detailsColumn><span class="sr-only">Options</span></template>
    <template #detailsCell="{ id }">
      <ButtonView
        @click="$router.push({ name: 'Machine details', params: { id } })"
      >
        Details
        <ArrowTopRightOnSquareIcon class="ms-2 h-5 w-5" aria-hidden="true" />
      </ButtonView>
    </template>
  </TableView>

  <MachineModalRegister
    :open="modalRegisterOpen"
    @register="onModalRegister"
    @close="modalRegisterOpen = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { SquaresPlusIcon } from "@heroicons/vue/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { UseClipboard } from "@vueuse/components";
import BadgeView from "../components/BadgeView.vue";
import ButtonView from "../components/ButtonView.vue";
import CodeBlock from "../components/CodeBlock.vue";
import MachineModalRegister from "../components/MachineModalRegister.vue";
import TableView from "../components/TableView.vue";
import { Machine } from "../helpers/types";
import { api, useStateApi } from "../plugins/api";

const modalRegisterOpen = ref(false);

const { state, isLoading, execute } = useStateApi(() =>
  api().GET("/api/v1/machine"),
);

const machines = computed(() => {
  const machinesFromApi = <Machine[] | undefined>state.value?.machines;

  if (!machinesFromApi) {
    return [];
  }

  return machinesFromApi.map(
    ({ id, givenName, online, ipAddresses, user }) => ({
      id,
      online,
      name: givenName,
      ipAddresses: ipAddresses.sort((a, b) => a.length - b.length),
      user: user.name,
      details: null,
    }),
  );
});

const onModalRegister = () => {
  execute();
  modalRegisterOpen.value = false;
};
</script>
