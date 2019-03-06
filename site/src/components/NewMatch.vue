<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="blue" text-color="white" font-size="0.9rem">
        W
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item>
        <q-item-section>
          <q-item-label>Granite State District Event - Finals 2</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section v-if="$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b>{{ data.winner === 'red' ? 'Victory' : 'Defeat' }}</b>
                  (Red Alliance)
                  (<b>{{ data.red_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="red"
                            :data="data.red0"
                            :active="data.red0.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red1"
                            :active="data.red1.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red2"
                            :active="data.red2.team === protagonist"/>
          </q-list>
        </q-item-section>

        <q-item-section v-if="$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b>{{ data.winner === 'blue' ? 'Victory' : 'Defeat' }}</b>
                  (Blue Alliance)
                  (<b>{{ data.blue_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="blue"
                            :data="data.blue0"
                            :active="data.blue0.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue1"
                            :active="data.blue1.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue2"
                            :active="data.blue2.team === protagonist"/>
          </q-list>
        </q-item-section>

        <q-item-section v-if="!$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b>{{ data.winner === 'red' ? 'Victory' : 'Defeat' }}</b>
                  (Red Alliance)
                  (<b>{{ data.red_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="red"
                            :data="data.red0"
                            :active="data.red0.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red1"
                            :active="data.red1.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red2"
                            :active="data.red2.team === protagonist"/>
          </q-list>

          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b>{{ data.winner === 'blue' ? 'Victory' : 'Defeat' }}</b>
                  (Blue Alliance)
                  (<b>{{ data.blue_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="blue"
                            :data="data.blue0"
                            :active="data.blue0.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue1"
                            :active="data.blue1.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue2"
                            :active="data.blue2.team === protagonist"/>
          </q-list>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-item>
</template>

<script>
import avatars from '../assets/avatars.json';
import NewTeamEntry from './NewTeamEntry.vue';

export default {
  name: 'NewMatch',
  components: {
    NewTeamEntry,
  },
  props: ['data', 'protagonist'],
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

<style scoped lang="stylus">
 .active-team-link
    color white
    background gray
</style>
