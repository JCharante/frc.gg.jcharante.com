<template>
  <q-page>
    <div class="container">
      <div class="row flex flex-center">
        <h1>frc.gg</h1>
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
              <q-item-label caption>{{ team.rank }}</q-item-label>
              <q-item-label caption v-if="team.rookie_year === 2019">
                <q-chip outline color="black">Rookie</q-chip>
              </q-item-label>
              <q-item-label caption v-if="team.rookie_year === 2018">
                <q-chip outline color="black">2nd Year</q-chip>
              </q-item-label>
              <q-item-label caption v-if="teamInTop25(team.team_number)">
                <q-chip v-for="(value, key) in getTop25Info(team.team_number)"
                        :key="key"
                        color="orange">
                  {{ key === 'week1' ? 'FRC Top 25 Week One' : key }}
                  #{{ value }}
                </q-chip>
              </q-item-label>
            </q-item-section>
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

export default {
  name: 'PageIndex',
  computed: {
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
    currentPage() {
      return this.$route.params.pageNum;
    },
    listOfTeams() {
      const LOT = dataset.teams;
      // optimization
      if (this.searchTerm === '' && !this.onlyRookies && !this.onlyFRCTop25 && !this.onlyEinsteinTeams) {
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
      return einstein.allTeams.includes(team);
    },
  },
  data() {
    return {
      dataset,
      curPage: this.$route.params.pageNum,
    };
  },
};
</script>
