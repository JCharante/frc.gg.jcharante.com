<template>
  <q-page>
    <div class="container">
      <div class="row flex flex-center">
        <h1>frc.gg</h1>
      </div>
      <div class="row justify-center">
        <p>Processed
          {{ dataset.numMatchesProcessed}} /
          {{ dataset.numMatchesProcessed + dataset.numMatchesPredicting }}
          Matches. Predicting {{ dataset.numMatchesPredicting }} Matches.</p>
      </div>
      <div class="row justify-center">
        <p>Data as of {{ dataset.asOf || "unknown" }} EDT</p>
      </div>
      <div class="row flex flex-center">
        <p>Ever wanted op.gg but for FRC? No?
          Oh, well I already started on it so you might as well take a look.</p>
        <p>
          If you have any suggestions, send an email to frc.gg@jcharante.com</p>
      </div>
      <div class="row justify-center items-center"
           style="width: 400px; max-width: 90%; margin: auto;"
      >
        <q-input v-model="searchTerm" label="Search for Team"/>
      </div>
      <div class="row justify-center items-center"
           style="width: 400px; max-width: 90%; margin: auto;"
      >
        <q-toggle
          v-model="onlyRookies"
          color="primary"
          label="Only Rookies"
        />
        <q-toggle
          v-model="onlyFRCTop25"
          color="orange"
          label="Only FRC Top 25"
        />
        <q-toggle
          v-model="onlyEinsteinTeams"
          color="green"
          label="Only Einstein Teams"
        />
        <q-toggle
          v-model="onlyWeekTwoTeams"
          color="green"
          label="Only Week Three Teams"
        />
        <div style="width: 100%">
          <q-select
            v-model="filteredEvents"
            multiple
            :options="eventOptions"
            option-value="id"
            option-label="desc"
            label="Show only from these events"
          />
        </div>
      </div>
      <div class="q-pa-md" style="width: 100%; max-width: 5000px">
        <q-list bordered separator>
          <q-item clickable
                  v-ripple
                  v-for="team in listOfTeams
                  .slice((this.currentPage - 1) * 100, this.currentPage * 100)"
                  :key="team.team_number"
                  :to="`/team/${team.team_number}`"
                  exact>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="white" text-color="gray" font-size="0.9rem">
                    #{{ team.spot }}
                  </q-avatar>
                </q-item-section>
                <q-item-section avatar>
                  <q-avatar square color="blue" v-if="hasAvatar(team.team_number)">
                    <img :src="getAvatar(team.team_number)">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>FRC {{ team.team_number }} - {{ team.nickname }}</q-item-label>
                  <q-item-label caption>
                    {{ team.rank }} || {{ getWinLossTieString(team.team_number) }}
                  </q-item-label>
                  <q-item-label caption>
                    Played with {{ getTeamStats(team.team_number).uniqueTeams }} Teams
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="hasBadges(team)">
                <q-item-section>
                  <div>
                    <q-chip v-if="teamIsUndefeated(team.team_number)"
                            outline
                            square
                            icon="send"
                            color="purple">
                      UNDEFEATED
                    </q-chip>
                    <template v-if="teamInTop25(team.team_number)">
                      <q-chip v-for="(value, key) in getTop25Info(team.team_number)"
                              :key="key"
                              color="orange">
                        {{ key === 'week1'
                        ? 'Top25 W1'
                        : (key === 'week2')
                        ? 'Top25 W2'
                        : (key === 'week3')
                        ? 'Top25 W3'
                        : key}}
                        #{{ value }}
                      </q-chip>
                    </template>
                    <q-chip v-if="isEinsteinTeam(team.team_number)" color="green">
                      Einstein {{ getMostRecentYearOnEinstein(team.team_number) }}
                    </q-chip>
                    <q-chip outline
                            color="black"
                            v-if="team.rookie_year === 2019">Rookie</q-chip>
                    <q-chip outline
                            color="black"
                            v-if="team.rookie_year === 2018">2nd Year</q-chip>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item>
        </q-list>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="curPage"
            :max="Math.ceil(dataset.teams.length / 100)"
            @input="$router.push(`/home/${curPage}`)"
            :input="true"
          >
          </q-pagination>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import dataset from 'assets/data.json';
import avatars from 'assets/avatars.json';
import einstein from 'assets/einstein.json';
import extra from 'assets/extra.json';
import weeks from 'assets/weeks.json';

export default {
  name: 'PageIndex',
  computed: {
    eventOptions() {
      return Object.entries(extra.eventNicknames)
        .map(ar => ({
          id: ar[0],
          desc: ar[1],
        }));
    },
    filteredEvents: {
      get() {
        return this.$store.state.filter.filteredEvents;
      },
      set(val) {
        return this.$store.commit('filter/setFilteredEvents', val);
      },
    },
    searchTerm: {
      get() {
        return this.$store.state.filter.searchTerm;
      },
      set(val) {
        return this.$store.commit('filter/setSearchTerm', val);
      },
    },
    onlyEinsteinTeams: {
      get() {
        return this.$store.state.filter.onlyEinsteinTeams;
      },
      set(val) {
        return this.$store.commit('filter/setOnlyEinsteinTeams', val);
      },
    },
    onlyFRCTop25: {
      get() {
        return this.$store.state.filter.onlyFRCTop25;
      },
      set(val) {
        return this.$store.commit('filter/setOnlyFRCTop25', val);
      },
    },
    onlyRookies: {
      get() {
        return this.$store.state.filter.onlyRookies;
      },
      set(val) {
        return this.$store.commit('filter/setOnlyRookies', val);
      },
    },
    onlyWeekTwoTeams: {
      get() {
        return this.$store.state.filter.onlyWeekTwoTeams;
      },
      set(val) {
        return this.$store.commit('filter/setOnlyWeekTwoTeams', val);
      },
    },
    currentPage() {
      return this.$route.params.pageNum;
    },
    listOfTeams() {
      const LOT = dataset.teams;
      // optimization
      if (this.searchTerm === ''
        && !this.onlyRookies
        && !this.onlyFRCTop25
        && !this.onlyWeekTwoTeams
        && !this.onlyEinsteinTeams
        && this.filteredEvents.length === 0) {
        return LOT;
      }
      return LOT.filter((team) => {
        let qualifies = true;
        if (this.onlyFRCTop25) {
          qualifies = qualifies && this.teamInTop25(team.team_number);
        }
        if (this.onlyRookies) {
          qualifies = qualifies && team.rookie_year === 2019;
        }
        if (this.onlyEinsteinTeams) {
          qualifies = qualifies && this.isEinsteinTeam(team.team_number);
        }
        if (this.onlyWeekTwoTeams) {
          qualifies = qualifies && this.teamCompetedInWeekTwo(team);
        }
        if (this.filteredEvents.length > 0) {
          const filteredEvents = this.filteredEvents.map(o => o.id);
          const intersectionOfEvents = filteredEvents.filter(v => team.eventsAttended.includes(v));
          qualifies = qualifies && intersectionOfEvents.length > 0;
        }
        if (this.searchTerm !== '') {
          const teamNumberInSearchTerm = team.team_number.toString() === this.searchTerm;
          const teamNicknameInSearchTerm = team.nickname.toLowerCase()
            .includes(this.searchTerm.toLowerCase());
          qualifies = qualifies && (teamNumberInSearchTerm || teamNicknameInSearchTerm);
        }
        return qualifies;
      });
    },
  },
  methods: {
    hasBadges(team) {
      return this.teamInTop25(team.team_number)
              || this.isEinsteinTeam(team.team_number)
              || this.teamIsUndefeated(team.team_number)
              || team.rookie_year === 2019
              || team.rookie_year === 2018;
    },
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
    teamInTop25(team) {
      return team in extra.top25;
    },
    getTop25Info(team) {
      return extra.top25[team];
    },
    isEinsteinTeam(team) {
      return team in einstein.teamAndYears;
    },
    teamIsUndefeated(team) {
      const stats = this.getTeamStats(team);
      return stats.losses === 0 && (stats.wins + stats.ties) > 0;
    },
    getMostRecentYearOnEinstein(team) {
      return einstein.teamAndYears[team] || 0;
    },
    getWinLossTieString(team) {
      return `${this.getTeamStats(team).wins}-${this.getTeamStats(team).losses}-${this.getTeamStats(team).ties}`;
    },
    getTeamStats(team) {
      if (team in this.teamStatsCache) {
        return this.teamStatsCache[team];
      }
      let wins = 0;
      let losses = 0;
      let ties = 0;
      const uniqueTeams = [];
      this.dataset.team_history[team]
        .map(key => this.dataset.matchesDict[key])
        .filter(match => match.status === 'completed')
        .forEach((match) => {
          let protagonistTeam = null;
          if (match.red0.team === team || match.red1.team === team || match.red2.team === team) {
            protagonistTeam = 'red';
          }
          if (match.blue0.team === team || match.blue1.team === team || match.blue2.team === team) {
            protagonistTeam = 'blue';
          }
          if (match.status === 'completed') {
            if (match.winner === '') {
              ties += 1;
            } else if (match.winner === protagonistTeam) {
              wins += 1;
            } else {
              losses += 1;
            }
          }
          [match.red0, match.red1, match.red2, match.blue0, match.blue1, match.blue2]
            .filter(t => t.team !== team)
            .forEach((t) => {
              if (!uniqueTeams.includes(t.team)) {
                uniqueTeams.push(t.team);
              }
            });
        });
      const ret = {
        uniqueTeams: uniqueTeams.length,
        wins,
        losses,
        ties,
      };
      this.teamStatsCache[team] = ret;
      return ret;
    },
    teamWasAtEvent(teamNum, event) {
      return event in this.dataset.teams
        .filter(team => team.team_number === teamNum)[0]
        .eventsAttended;
    },
    teamCompetedInWeekTwo(team) {
      let ret = false;
      team.eventsAttended.forEach((eventCode) => {
        if (weeks.week3.includes(eventCode)) {
          ret = true;
        }
      });
      return ret;
    },
  },
  data() {
    return {
      dataset,
      curPage: parseInt(this.$route.params.pageNum, 10),
      teamStatsCache: {},
    };
  },
};
</script>
