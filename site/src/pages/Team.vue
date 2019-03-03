<template>
  <q-page>
    <div class="row">
      <p>Looking up info for Team #{{ $route.params.team}}</p>
    </div>
    <h3>Team {{ teamNumber }} - {{ currentRank }}</h3>
    <hr>
    <match v-for="match in history"
           :key="match.key" :data="match" :teams-to-highlight="[parseInt(teamNumber)]"/>
  </q-page>
</template>

<script>
import dataset from 'assets/data.json';
import Match from 'components/Match.vue';

export default {
  name: 'Team',
  components: {
    Match,
  },
  computed: {
    history() {
      return this.dataset.team_history[this.teamNumber].slice().reverse();
    },
    currentRank() {
      return this.dataset.teams
        .filter(team => team.team_number === parseInt(this.teamNumber, 10))[0].rank;
    },
  },
  data() {
    return {
      teamNumber: this.$route.params.team,
      dataset,
    };
  },
};
</script>
