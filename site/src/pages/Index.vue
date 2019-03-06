<template>
  <q-page>
    <div class="row flex flex-center">
      <h1>frc.gg</h1>
    </div>
    <div class="row flex flex-center">
      <p>Ever wanted op.gg but for FRC? No? Well too bad because I already made it.</p>
    </div>
    <div class="q-pa-md" style="width: 100%; max-width: 5000px">
      <q-list bordered separator>
        <q-item clickable
                v-ripple
                v-for="(team, index) in dataset.teams"
                :key="team.team_number"
                :to="`/team/${team.team_number}`"
                exact>
          <q-item-section avatar>
            <q-avatar color="white" text-color="gray" font-size="0.9rem">
              #{{ index + 1 }}
            </q-avatar>
          </q-item-section>
          <q-item-section avatar v-if="hasAvatar(team.team_number)">
            <q-avatar square color="blue">
              <img :src="getAvatar(team.team_number)">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>FRC {{ team.team_number }} - </q-item-label>
            <q-item-label caption>{{ team.rank }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import dataset from 'assets/data.json';
import avatars from 'assets/avatars.json';

export default {
  name: 'PageIndex',
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
