<template>
  <q-page>
    <div class="row">
        <p class="team-title">Team {{ teamNumber }} - {{ teamInfo.nickname }}</p>
    </div>
    <div class="row">
      <p class="team-rank">Current Rank: {{ currentRank }}</p>
    </div>
    <hr>
    <q-list bordered separator>
      <new-match v-for="match in history"
                 :key="match.key"
                 :protagonist="parseInt(teamNumber)"/>
    </q-list>
    <match v-for="match in history"
           :key="match.key" :data="match" :teams-to-highlight="[parseInt(teamNumber)]"/>
  </q-page>
</template>

<style scoped>
  .team-title {
    margin-left: 20px;
    font-size: 2em;
    padding-top: 1em;
  }
  .team-rank {
    margin-left: 20px;
    font-size: 1.8em;
    padding-top: 0.2em;
  }
</style>

<script>
import dataset from 'assets/data.json';
import Match from 'components/Match.vue';
import NewMatch from '../components/NewMatch';

export default {
  name: 'Team',
  components: {
    NewMatch,
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
    teamInfo() {
      return this.dataset.teams
        .filter(team => team.team_number === parseInt(this.teamNumber, 10))[0];
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
