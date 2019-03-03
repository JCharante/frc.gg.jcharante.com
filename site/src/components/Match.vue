<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="row">
        <div class="col-4">
          <p><u>Red Alliance</u></p>
          <team-entry :data="data.red0"
                      :outcome="data.winner === 'red' ?
                      'winner' :
                      (data.winner === 'blue' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.red0.team)"/>
          <team-entry :data="data.red1"
                      :outcome="data.winner === 'red' ?
                      'winner' :
                      (data.winner === 'blue' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.red1.team)"/>
          <team-entry :data="data.red2"
                      :outcome="data.winner === 'red' ?
                      'winner' :
                      (data.winner === 'blue' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.red2.team)"/>
        </div>
        <div class="col-4">
          stats
        </div>
        <div class="col-4">
          <p><u>Blue Alliance</u></p>
          <team-entry :data="data.blue0"
                      :outcome="data.winner === 'blue' ?
                      'winner' :
                      (data.winner === 'red' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.blue0.team)"/>
          <team-entry :data="data.blue1"
                      :outcome="data.winner === 'blue' ?
                      'winner' :
                      (data.winner === 'red' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.blue1.team)"/>
          <team-entry :data="data.blue2"
                      :outcome="data.winner === 'blue' ?
                      'winner' :
                      (data.winner === 'red' ? 'loser' : 'draw')"
                      :emphasize="teamsToHighlight.includes(data.blue2.team)"/>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import TeamEntry from 'components/TeamEntry.vue';

export default {
  components: {
    TeamEntry,
  },
  name: 'Match',
  props: ['data', 'teams-to-highlight'],
};
</script>

<style scoped>

</style>
