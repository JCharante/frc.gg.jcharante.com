<template>
  <q-page>
    <q-item>
      <q-item-section avatar>
        <q-avatar square color="blue">
          <img :src="getAvatar(teamNumber)">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <h5>Team {{ teamNumber }} - {{ teamInfo.nickname }}</h5>
      </q-item-section>
    </q-item>
    <div class="row">
      <p class="team-rank">Current Rank: {{ currentRank }}</p>
    </div>
    <q-list bordered separator>
      <new-match v-for="match in history"
                 :key="match.key"
                 :data="match"
                 :protagonist="parseInt(teamNumber)"/>
    </q-list>
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
import avatars from 'assets/avatars.json';
import dataset from 'assets/data.json';
import NewMatch from '../components/NewMatch';

export default {
  name: 'Team',
  components: {
    NewMatch,
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
    teamNumber() {
      return this.$route.params.team;
    },
  },
  methods: {
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
  },
  data() {
    return {
      dataset,
    };
  },
};
</script>
