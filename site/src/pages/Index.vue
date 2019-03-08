<template>
  <q-page>
    <div class="row flex flex-center">
      <h1>frc.gg</h1>
    </div>
    <div class="row flex flex-center">
      <p>Ever wanted op.gg but for FRC? No? Well too bad because I already made it*</p>
      <p>
        *I'm still working on it.
        If you have any suggestions, send an email to frc.gg@jcharante.com</p>
    </div>
    <div class="q-pa-md" style="width: 100%; max-width: 5000px">
      <q-list bordered separator>
        <q-item clickable
                v-ripple
                v-for="(team, index) in dataset.teams.slice(
                  (currentPage - 1) * 100,
                  currentPage * 100
                )"
                :key="team.team_number"
                :to="`/team/${team.team_number}`"
                exact>
          <q-item-section avatar>
            <q-avatar color="white" text-color="gray" font-size="0.9rem">
              #{{ (currentPage - 1) * 100 + index + 1 }}
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
          v-model="currentPage"
          :max="Math.ceil(dataset.teams.length / 100)"
          :input="true"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import dataset from 'assets/data.json';
import avatars from 'assets/avatars.json';
import extra from 'assets/extra.json';

export default {
  name: 'PageIndex',
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
  },
  data() {
    return {
      dataset,
      currentPage: 1,
    };
  },
};
</script>
