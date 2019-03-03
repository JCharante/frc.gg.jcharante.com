<template>
  <p :style="{'background-color': backgroundColor, 'font-weight': emphasize ? 'bold' : 'normal'}">
    {{ data.team }} ({{ data.oldRank }}) -> ({{ data.newRank }})
  </p>
</template>

<script>
export default {
  name: 'TeamEntry',
  props: ['data', 'outcome', 'emphasize'],
  computed: {
    backgroundColor() {
      if (this.outcome === 'winner') {
        return 'green';
      }

      if (this.outcome === 'loser') {
        return 'red';
      }

      return 'gray';
    },
  },
};
</script>

<style scoped>

</style>
