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
    <div class="row">
      <p class="team-tba-link">
        <a :href="teamTBALink" target="_blank">
          View Team on The Blue Alliance
        </a>
      </p>
    </div>
    <div class="row justify-center">
      <div id="chartContainer" style="height: 360px; width: 80%;"></div>
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
  .team-tba-link {
    margin-left: 20px;
  }
  .team-rank {
    margin-left: 20px;
    font-size: 1.8em;
    padding-top: 0;
  }
</style>

<script>
import avatars from 'assets/avatars.json';
import dataset from 'assets/data.json';
import NewMatch from '../components/NewMatch';

const CanvasJS = require('../../node_modules/canvasjs/dist/canvasjs.min.js');

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
    teamTBALink() {
      return `https://thebluealliance.com/team/${this.teamNumber}`;
    },
    teamNumber() {
      return this.$route.params.team;
    },
    chartTitle() {
      return 'Ranking over Time';
    },
    chartDataPoints() {
      const ret = [];
      let lastRanking = '';
      this.dataset.team_history[this.teamNumber].forEach((match, i) => {
        let protagonist = null;
        if (match.red0.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.red0;
        }
        if (match.red1.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.red1;
        }
        if (match.red2.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.red2;
        }
        if (match.blue0.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.blue0;
        }
        if (match.blue1.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.blue1;
        }
        if (match.blue2.team === parseInt(this.teamNumber, 10)) {
          protagonist = match.blue2;
        }
        const objBeingPushed = {
          x: i + 1,
          y: protagonist.newMu,
        };
        if (protagonist.newRank !== lastRanking) {
          lastRanking = protagonist.newRank;
          objBeingPushed.indexLabel = this.shortenTitle(protagonist.newRank);
        }
        ret.push(objBeingPushed);
      });
      return ret;
    },
  },
  methods: {
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
    shortenTitle(title) {
      if (title === 'Challenger') {
        return title;
      }
      if (title === 'Grandmaster') {
        return 'GM';
      }
      if (title === 'Master') {
        return 'M';
      }
      const firstWord = title.split(' ')[0];
      const secondWord = title.split(' ')[1];
      let newTitle = '';
      switch (firstWord) {
        case 'Iron':
          newTitle = 'I';
          break;
        case 'Silver':
          newTitle = 'S';
          break;
        case 'Gold':
          newTitle = 'G';
          break;
        case 'Platinum':
          newTitle = 'P';
          break;
        case 'Diamond':
          newTitle = 'D';
          break;
        default:
          newTitle = firstWord;
      }
      switch (secondWord) {
        case 'I':
          newTitle += '1';
          break;
        case 'II':
          newTitle += '2';
          break;
        case 'III':
          newTitle += '3';
          break;
        case 'IV':
          newTitle += '4';
          break;
        default:
          newTitle += secondWord;
      }
      return newTitle;
    },
  },
  data() {
    return {
      dataset,
      chart: null,
    };
  },
  watch: {
    $route() {
      this.chart = new CanvasJS.Chart('chartContainer', {
        title: {
          text: this.chartTitle,
        },
        axisY: {
          includeZero: false,
        },
        data: [
          {
            type: 'line',
            dataPoints: this.chartDataPoints,
          },
        ],
      });
      this.chart.render();
    },
  },
  mounted() {
    this.chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: this.chartTitle,
      },
      axisY: {
        includeZero: false,
      },
      data: [
        {
          type: 'line',
          dataPoints: this.chartDataPoints,
        },
      ],
    });
    this.chart.render();
  },
};
</script>
