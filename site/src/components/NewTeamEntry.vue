<template>
  <q-item :active="active"
          active-class="active-team-link"
          :to="`/team/${data.team}`"
          exact>
    <q-item-section avatar>
      <q-avatar square :color="alliance">
        <img :src="getAvatar(data.team)">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ data.team }}
        <span v-if="`currentRank` in data">
          ({{ data.currentRank }})
        </span>
        <span v-else>
        {{
          data.newRank !== data.oldRank ?
            `(${data.newRank} from ${data.oldRank})` :
            `(${data.newRank})`
        }}
        </span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import avatars from '../assets/avatars.json';

export default {
  name: 'NewTeamEntry',
  props: ['active', 'data', 'alliance'],
  methods: {
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
  },
};
</script>

<style scoped>

</style>
